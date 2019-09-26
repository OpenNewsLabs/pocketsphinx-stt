const fs = require('fs');
const path = require('path');
const recombineSegmentsTimings = require('./index.js');
const files = require('./sample-input/output.json');

const transcript = recombineSegmentsTimings(files);

fs.writeFileSync(path.join(__dirname, 'sample-output', 'sampletranscript.json'), JSON.stringify(transcript, null, 2))