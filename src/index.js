const path = require('path');
const pocketsphinxSTT = require('./pocketsphinx-stt/index.js');
const convertToAudio = require('./convert-to-audio/index.js');
const convertPocketsphinxOutputToDpe = require('./pocketsphinx-stt/pocketsphinx-to-dpe/index.js');

const transcribe = async(inputFilePath) =>{
    const pocketsphinxTranscript = await pocketsphinxSTT(inputFilePath);
    console.log(inputFilePath,pocketsphinxTranscript)
    return convertPocketsphinxOutputToDpe(pocketsphinxTranscript);
}

const convertAndTranscribe = async (inputFilePath, audioFileOutput) =>{
    let audioFileOutputPath = audioFileOutput;
    // if output for converted audio file not specified, then uses same as input file with audio extension as default
    if(!audioFileOutput){
        const pathParsed =  path.parse(inputFilePath) 
        audioFileOutputPath = path.join(pathParsed.root, pathParsed.dir, `${ pathParsed.name }.wav`);
    }
    const newAudioFile = await convertToAudio(inputFilePath, audioFileOutputPath);
    console.log('newAudioFile', newAudioFile)
   const transcript =  await transcribe(newAudioFile);
   return transcript;
}

module.exports = convertAndTranscribe;
module.exports.transcribe = transcribe;
module.exports.convertAndTranscribe = convertAndTranscribe;