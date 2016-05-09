var video_to_audio = require('../video_to_audio_for_pocketsphinx.js')

video_to_audio.convert('./test.mp4', function(){
  console.log("callback when done exporting audio")
});
