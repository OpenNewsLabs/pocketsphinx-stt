const pocketsphinxSTT = require('./pocketsphinx-stt/index.js');
const convertPocketsphinxOutputToDpe = require('./pocketsphinx-stt/pocketsphinx-to-dpe/index.js');

const pocketsphinxTranscribe = async(inputFilePath) => {
    const pocketsphinxTranscript = await pocketsphinxSTT(inputFilePath);
    return convertPocketsphinxOutputToDpe(pocketsphinxTranscript);
}


module.exports = pocketsphinxTranscribe;