const readVideoMetadataForEDL = require('./index.js').readVideoMetadataForEDL;
const readMetadata = require('./index.js').readMetadata;


const videoFile = '/Users/passarellip/Movies/trump-inauguration.mp4';


const main = async(videoFile) => {
    try {
        const res = await readVideoMetadataForEDL(videoFile);
        console.log(res);
    } catch (e) {
        console.error('error 1')
    }

    try {
        const res2 = await readMetadata(videoFile);
        console.log(res2);
    } catch (e) {
        console.error('error 2')
    }
}

main(videoFile);