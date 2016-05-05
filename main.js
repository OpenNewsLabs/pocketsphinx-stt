var fs = require('fs');

var videoToAudio          = require('./video_to_audio_for_pocketsphinx.js');
var audioToText           = require('./pocketsphinx.js');
var textToHypertranscript = require('./pocketsphinx_converter.js');
var hypertranscriptToSrt  = require('./hypertranscript_to_srt.js');

//convert to SRT
function  convert_to_srt(video_filename, cb){
  videoToAudio.convert(video_filename, function(audio_filename){
    audioToText.convert(audio_filename, function(text){
      textToHypertranscript.convert(text, function(hp){
        hypertranscriptToSrt.convert(hp,function(srt_content){
          cb(srt_content)
        } )
      })
    })
  })
}


//Convert to hyprtranscript
function  convert_to_hp(video_filename, cb){
  videoToAudio.convert(video_filename, function(audio_filename){
    audioToText.convert(audio_filename, function(text){
      textToHypertranscript.convert(text, function(hp){

          cb(hp)

      })
    })
  })
}


/**
* Writing to file.
* takes in file name and content as parameters
* TODO: add callback to do something once file has been written 
*/
function writeToFile(fileName,content){
  fs.writeFile(fileName, content, {
    encoding: 'utf8'
  }, function(err) {
    if (err) console.log(err);
    console.log('finished writing');
  });
}




 module.exports = {
   videoToAudio: videoToAudio.convert ,
   audioToText: audioToText.convert,
   textToHypertranscript: textToHypertranscript.convert,
   hypertranscriptToSrt: hypertranscriptToSrt.convert,

   convert_video_to_srt:  convert_to_srt,
   convert_video_to_hypertranscriptp: convert_to_hp,

   writeToFile: writeToFile
 };
