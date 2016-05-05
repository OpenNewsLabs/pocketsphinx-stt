var Path = require('path');
var spawn = require('child_process').spawn;
/**
* Function to convert video into audio compatible with pocketSphinx specs using ffmpeg.
* Takes in the path of the video file.
* the callback returns path of the audio file
* for simplicity the audio file has got the original video file name with `.temp.wav` added to it.
*/
function convert(path, cb) {
  var new_name = path + '.temp.wav';
  var ffmpeg = spawn(Path.join(__dirname, 'videogrep_standalone/ffmpeg'), ['-y', '-i', path, '-acodec', 'pcm_s16le', '-ac', '1', '-ar', '16000', new_name]);

  ffmpeg.stdout.on('data', function(data) {
    console.log('' + data);
    console.log("Transcoding video to audio...")
  });

  ffmpeg.on('close', function(code) {
    console.log('finished converting video to audio');
    cb(new_name);
  });
}

module.exports.convert = convert;
