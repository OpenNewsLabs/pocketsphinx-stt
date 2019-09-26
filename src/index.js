const { Worker } = require('worker_threads');
const fs = require('fs');
const path = require('path');
const os = require('os');
const convertToAudio = require('./convert-to-audio/index.js');
const recombineSegmentsTimings = require('./recombine-segments-timings/index.js');
const readVideoMetadataForEDL = require('./metadata-reader/index.js').readVideoMetadataForEDL;
const trim = require('./trim/index.js');

const pathToWorkerFile = path.join(__dirname, 'worker.js');
const threadCount = os.cpus().length;

/**
 * Helper function to segment 
 * @param {array} list - eg [ ... { id: 14, name: 'file_14.wav', offset: 4915200, status: true }, ..]
 * @param {number} threadCount 
 */
function chunk(list, threadCount) {
    const numberOfElements = list.length;
    const groups = Math.ceil(numberOfElements / threadCount);
    const intervalList = Array.from(Array(groups).keys());

    let inPoint = 0;
    let outPoint = threadCount;

    const result = intervalList.map(() => {
        const result = list.slice(inPoint, outPoint);
        inPoint = outPoint;
        outPoint += threadCount;
        return result;
    })

    return result;
}

const main = async(videoFile) => {

    const results = [];
    // get duration
    const metadata = await readVideoMetadataForEDL(videoFile)
        // const duration = 2 * 60 * 60; // 2 hours in seconds
    const duration = metadata.duration;
    // split into 5 min chunks 
    // const lengthOfSegments = 60 * 1; //sec
    const lengthOfSegments = 60 * 5; //sec

    const total = parseInt(duration / lengthOfSegments) + 1;
    const placeHolderList = Array.from(Array(total).keys());

    let offset = 0;
    const files = placeHolderList.map((id, index) => {
        const res = {
            id: id,
            name: `file_${id}.wav`,
            offset: offset,
            status: false
        };
        // increase counter for offset
        offset += lengthOfSegments;
        return res;
    })

    const audioFile = await convertToAudio(videoFile);

    /**
     * Trim
     */
    // TODO: trim could be parallelize to speed things up?
    for (let file of files) {
        await trim({
            src: audioFile,
            input: file.offset,
            duration: lengthOfSegments,
            outputName: path.join(__dirname, 'trimmed', file.name),
        })
    }


    // change to for in loop to make syncronous? and split across numberOfCores?
    const segmentesGroupped = chunk(files, threadCount);

    console.log(segmentesGroupped);

    return new Promise((resolve, reject) => {
        segmentesGroupped.forEach((segments) => {
            console.log('segments', segments)
            const worker = new Worker(pathToWorkerFile, { workerData: segments });

            worker.once('message', (message) => {
                results.push(...message);
            });

            worker.on('error', (err) => {
                console.error(err);
                reject(new Error(`Worker stopped with exit code ${err}`));
            });

            worker.on('exit', () => {
                if (files.length === results.length) {
                    // recombine results 
                    const sortedResults = results.sort(function(a, b) { return a.id - b.id });
                    const transcript = recombineSegmentsTimings(results);

                    /**
                     * Clean up,  Delete trimmed files 
                     */
                    files.forEach((file) => {
                        const trimmedSegment = path.join(__dirname, 'trimmed', file.name);
                        fs.unlinkSync(trimmedSegment);
                    })

                    resolve(transcript);
                }
            })
        })

    })
}

module.exports = main;