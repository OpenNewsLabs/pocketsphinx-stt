# IBM Watson

Code from video grep project to make a call to IBM Watson API, from Video grep OSx Project 


```javascript
function watsonTranscribe(path, cb) {
  var new_name = path + '.temp.wav';
  var ffmpeg = spawn(Path.join(__dirname, 'videogrep_standalone/ffmpeg'), ['-y', '-i', path, '-acodec', 'pcm_s16le', '-ac', '1', '-ar', '16000', new_name]);

  ffmpeg.stdout.on('data', function(data) {
    console.log('' + data);
  });

  ffmpeg.on('close', function(code) {
    console.log('finished converting');
    watson(new_name, cb);
  });
}


function watson(path, cb) {
  request.post('https://stream.watsonplatform.net/speech-to-text/api/v1/recognize?continuous=true&timestamps=true', {
    'auth': {
      'user': '',
      'pass': ''

    }

  })
}
```
