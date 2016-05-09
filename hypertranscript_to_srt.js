var parser = require('subtitles-parser')


function hypertranscript_to_srt(d,callback){
  //make srt JSON from hypertranscript
  var sq=[];
  for(var i=0; i<d[0].length ; i++ ){
      var seg={};
      seg.id = i+1;
      //in milliseconds
      seg.startTime = d[0][i].start *1000;
      seg.endTime =d[0][i].end *1000;
      seg.text =d[0][i].text;
      sq.push(seg);
  }
  //make hipertranscript

    // var dataMs = parser.fromSrt(sq)
    var dataMs = parser.toSrt(sq) ;
    // console.log("------srt--------");
    // console.log(dataMs);
    // console.log("--------------");
    if (callback) callback(dataMs);
    return dataMs;
}



module.exports.convert = hypertranscript_to_srt;
