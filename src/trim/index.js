/**
* @module trim
* @description trims a video or audio file 
* @example
 var trim = require('./index.js')
   await trim({
            src: "debate_test.wav",
        	input: 773,
            duration:20,
            outputName:"debate_test_trimmed.wav",
        })
* @requires ffmpeg-fluent - to trim the audio or video.
* @requires ffmpeg-static-electron - for ffmpeg binary to use with ffmpeg-fluent
*/
const ffmpegBinPath = require('ffmpeg-static-electron').path;
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegBinPath);

/**
 * @function trim
 * @description Trims a video or audio file 
 * @param {object} config -  The parameter containting attribute options.
 * @param {string} config.src -  video or audio file path,relative to computer root 
 * @param {number} config.input -  input point for cutting video or audio from - seconds or hh:mm:ss.mms
 * @param {number} config.duration - duration to cut video or audio for how long - seconds
 * @param {string} config.outputName - desired name of the trimmed clip
 * @returns {string}  return when transcription has done processing. It returns output name .
 * 
 */
const trim = function(config) {

    const videoSrc = config.src;
    const input = config.input;
    const duration = config.duration;
    const outputName = config.outputName;

    return new Promise((resolve, reject) => {
        // running ffmpeg 
        ffmpeg(videoSrc)
            .seekInput(input)
            .setDuration(duration)
            .output(outputName)
            .on('end', () => {
                resolve(outputName);
            })
            .on('error', (err) => {
                reject(err);
            })
            .run();
    });
}
module.exports = trim;