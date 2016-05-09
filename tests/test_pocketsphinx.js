/**
* Testing both generating a pocketsphinx_text from audio file.
* as well as converting pocketsphinx_text to hypertranscript json
*/

var pocketSphinx = require('../pocketsphinx.js');
var pocketSphinxTextConverter= require('../pocketsphinx_converter.js');

pocketSphinx.convert('../test.mp4.temp.wav',function(pocketsphinx_text){
  console.log(pocketsphinx_text)
  console.log("here")

  // pocketSphinxTextConverter.convert(pocketsphinx_text, function(hypertranscript){
  //   console.log(hypertranscript)
  // })

})
