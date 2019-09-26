const fs = require('fs');
const main = require('./index.js');

// const videoFile = '/Users/passarellip/CODE/WORK/Democratic\ Presidential\ Debate\ STT\ Analyses/debates/ABC\ News\ Democratic\ Debate\ -\ WATCH\ THE\ FULL\ DEBATE\ \(2019\)/ABC\ News\ Democratic\ Debate\ -\ WATCH\ THE\ FULL\ DEBATE\ \(2019\)-2UWVO0Trd1c-trimmed.mp4';
// const videoFile = '/Users/passarellip/CODE/WORK/Democratic\ Presidential\ Debate\ STT\ Analyses/debates/Democratic\ Presidential\ Debate\ -\ July\ 31\ \|\ CNN/CNN\ Democratic\ Presidential\ Debate\ Jul\ 31\,2019-vW3iUWIChfs-trimmed.mp4';
// const videoFile = '/Users/passarellip/CODE/WORK/Democratic\ Presidential\ Debate\ STT\ Analyses/debates/Democratic\ Presidential\ Debate\ -\ June\ 27\ \(Full\)\ \|\ NBC\ News/_-cX7hni-zGD8-trimmed-debate-only.mp4';
const videoFile = '/Users/passarellip/Movies/trump-inauguration-5-min.mp4';
// const videoFile = '/Users/passarellip/Movies/trump-inauguration.mp4';

(async() => {
    const d = new Date();
    console.log(d.toLocaleString()); // 
    const transcript = await main(videoFile)
    console.log('final result', transcript);
    const d2 = new Date();
    console.log(d.toLocaleString(), '-', d2.toLocaleString()) // 
    fs.writeFileSync('./sampletranscript.json', JSON.stringify(transcript, null, 2))
})();

// 16 min with 1 min chunks - transcribe in 2 minutes 
// 9/25/2019, 10:46:29 PM - 9/25/2019, 10:48:42 PM

// 1h 43 min with 5 min chunks - transcribed in 42 minutes
// 9/26/2019, 10:35:24 AM - 9/26/2019, 11:05:13 AM


// 9/26/2019, 12:05:12 PM - 9/26/2019, 12:39:15 PM
// Democratic\ Presidential\ Debate\ Jul\ 31\,2019-vW3iUWIChfs-trimmed.mp4



// 9/26/2019, 4:11:31 PM - 9/26/2019, 4:57:15 PM - 46 min?
// ABC\ News\ Democratic\ Debate\ -\ WATCH\ THE\ FULL\ DEBATE\ \(2019\)-2UWVO0Trd1c-trimmed.mp4 - 2min 30 sec duration