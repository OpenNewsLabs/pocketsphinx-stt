var fs = require('fs');
var Path = require('path');
var spawn = require('child_process').spawn;
/**
* pocketSphinx function to convert audio file meeting pocketSphinx specs to text
* takes in audio file
* returns string of transcription formatted by pocketSphinx see line 43 for example
*/
function pocketSphinx(path, cb) {

  var filename = path.replace('.temp.wav', '') + '.transcription.txt';

  var args = [
    '-infile', path,
    '-time', 'yes',
    '-logfn', '/dev/null',
    '-vad_prespeech', '10',
    '-vad_postspeech', '50',
    '-feat', '1s_c_d_dd	1s_c_d_dd',
    '-dict', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/cmudict-en-us.dict'),
    '-fdict', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/noisedict'),
    '-featparams', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/feat.params'),
    '-hmm', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us'),
    '-lm', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us.lm.bin'),
    '-mdef', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/mdef'),
    '-mean', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/means'),
    '-sendump', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/sendump'),
    '-tmat', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/transition_matrices'),
    '-var', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/variances')
  ];

  var options = {
    env: {
      'DYLD_LIBRARY_PATH': Path.join(__dirname, 'sphinxbase/lib') + ':' + Path.join(__dirname, 'pocketsphinx/lib/')
    }
  };

  var ps = spawn(Path.join(__dirname, 'pocketsphinx/bin/pocketsphinx_continuous'), args, options);

  var transcript = '';
  ps.stdout.on('data', function(data) {
    console.log("transcribing...")
    transcript += '' + data;
//console.log(transcript)
// how do you destroy i said i needed
// <s> 0.160 0.180 0.998501
// how 0.190 0.340 0.070404
// do 0.350 0.510 0.740274
// you 0.520 0.890 0.979021
// destroy 0.900 1.260 0.768872
// i 1.270 1.490 0.201456
// said 1.500 1.700 0.611245
// <sil> 1.710 2.050 0.992924
// i 2.060 2.240 0.329978
// needed(2) 2.250 2.640 0.435223
// </s> 2.650 3.040 1.000000
  });

  ps.on('close', function(code) {
    cb(transcript);
  });
}






module.exports.convert = pocketSphinx;
