var Path = require('path');
var spawn = require('child_process').spawn;
/**
* Function to convert video into audio compatible with pocketSphinx specs using ffmpeg.
* Takes in the path of the video file.
* the callback returns path of the audio file
* for simplicity the audio file has got the original video file name with `.temp.wav` added to it.
*/
function convert(path, cb) {
  var input_path = Path.join(__dirname, path);
  var new_name = Path.join(__dirname, path + '.temp.wav');
  var ffpmeg_path = Path.join(__dirname, 'videogrep_standalone/ffmpeg');
  console.log(ffpmeg_path);
  console.log(new_name);
  console.log(input_path);
  var ffmpeg = spawn(ffpmeg_path, ['-y', '-i', input_path, '-acodec', 'pcm_s16le', '-ac', '1', '-ar', '16000', new_name]);

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
