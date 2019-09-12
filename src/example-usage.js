const convertAndTranscribe = require('./index.js').convertAndTranscribe;
const transcribe = require('./index.js').transcribe;

const filePath = '/Users/passarellip/Library/Application\ Support/digital-paper-edit-electron/media/_-qTH_i99n3R0.wav';

// transcribe(filePath)
//     .then((res) => {
//     console.log('transcribe', res);
//     })

const videoFilePath = '/Users/passarellip/Library/Application\ Support/digital-paper-edit-electron/media/_-qTH_i99n3R0.mp4';
convertAndTranscribe(videoFilePath)
    .then((res) => {
    console.log('transcribe', res);
    })
