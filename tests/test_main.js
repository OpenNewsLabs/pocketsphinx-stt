var fs = require('fs');
var main = require('../main.js')

// main.videoToAudio('./test.mp4', function(res){
//   console.log(res)
// });

// var video_file_name = './test.mp4';
 var video_file_name = "./norman_door.mp4";

main.convert_video_to_srt(video_file_name, function(res){
  console.log(res)
  main.writeToFile(video_file_name+".srt",res)
});

main.convert_video_to_hypertranscript(video_file_name, function(res){
  console.log(res)
    main.writeToFile(video_file_name+".json",JSON.stringify(res,null,2))
});
