const { Worker, isMainThread, parentPort, workerData, threadId } = require('worker_threads');
const path = require('path');
const pocketsphinxTranscribe = require('./pocketsphinx-transcribe.js');

(async() => {
    for (let file of workerData) {
        // TODO: need to do add tmp file on file system?
        // or switch file path in the segment data structure etc.. in main thread
        const trimmedSegment = path.join(__dirname, 'trimmed', file.name);
        const transcript = await pocketsphinxTranscribe(trimmedSegment);
        file.transcript = transcript;
        file.status = true;
    }

    parentPort.postMessage(workerData);
})();