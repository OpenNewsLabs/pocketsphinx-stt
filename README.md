## pocketsphinx-stt
Speech to text module initially [Video grep Mac OSX Electron app](https://github.com/antiboredom/videogrep), by Sam Lavine [@sam_lavigne](https://twitter.com/sam_lavigne)



Then refactored as part of [autoEdit](https://github.com/OpenNewsLabs/autoEdit_2), and subsequently as part of [Digital Paper Edit](https://github.com/bbc/digital-paper-edit-electron) app.

<!-- It uses Pocketshphinx and ffmpeg binaries for os x. To run on a linux server you'd need to get (or compile) those binaries for linux. -->


Pocketshphinx is set with American english dictionary.

## Setup
<!-- _stack - optional_
_How to build and run the code/app_ -->

```
git clone https://github.com/OpenNewsLabs/pocketsphinx-stt
```

```
cd pocketsphinx-stt
```
```
npm install
```

## Usage

on npm [`pocketsphinx-stt`](https://www.npmjs.com/package/pocketsphinx-stt)

```
npm install pocketsphinx-stt
```


There are two options, one expect the file to be already an audio file that can work with pocketsphixn 

```js
const transcribe = require('pocketsphinx-stt').transcribe;
const videoFilePath = // some video file

transcribe(videoFilePath)
    .then((res) => {
        console.log('transcribe', res);
    })
```


While the other will use ffmpeg convert the audio or video file to the right format for pocketsphinx.
```js
const convertAndTranscribe = require('pocketsphinx-stt').convertAndTranscribe;
const videoFilePath = // some video file

convertAndTranscribe(videoFilePath)
    .then((res) => {
        console.log('transcribe', res);
    })
```

It can take an optional parameter to specifiy where you'd want to save the audio file, if not provided it saves it in the same folder as the original media, with same name but audio extension.

Check out and try the example usage `node src/example-usage.js` for more 


### Example output

Uses json format for transcript from [Digital Paper Edit](https://github.com/bbc/digital-paper-edit-electron) project.

```js
{ words:
   [ { text: 'why', start: 0.28, end: 1.23, accuracy: 0.018412, id: 0 },
     { text: 'not', start: 1.32, end: 1.85, accuracy: 0.851958, id: 1 },
     { text: 'she\'s', start: 2.4, end: 2.7, accuracy: 0.067643, id: 2 },
    ...
    ],
  paragraphs:
   [ { id: 0, start: 0.28, end: 3.93, speaker: 'U_UKN' },
     { id: 1, start: 4.69, end: 5.81, speaker: 'U_UKN' },
     { id: 2, start: 6.55, end: 7.37, speaker: 'U_UKN' },
  ...
   ]
}

```

## System Architecture
<!-- _High level overview of system architecture_ -->

_TBC_

<!-- ## Documentation

There's a [docs](./docs) folder in this repository.

[docs/notes](./docs/notes) contains dev draft notes on various aspects of the project. This would generally be converted either into ADRs or guides when ready.

[docs/adr](./docs/adr) contains [Architecture Decision Record](https://github.com/joelparkerhenderson/architecture_decision_record).

> An architectural decision record (ADR) is a document that captures an important architectural decision made along with its context and consequences.

We are using [this template for ADR](https://gist.github.com/iaincollins/92923cc2c309c2751aea6f1b34b31d95) -->

## Development env
 <!-- _How to run the development environment_ -->

- npm > `6.1.0`
- [Node 10 - dubnium](https://scotch.io/tutorials/whats-new-in-node-10-dubnium)

<!-- - npm > `6.1.0`
- [Node 10 - dubnium](https://scotch.io/tutorials/whats-new-in-node-10-dubnium)

Node version is set in node version manager [`.nvmrc`](https://github.com/creationix/nvm#nvmrc) -->

<!-- _Coding style convention ref optional, eg which linter to use_ -->

<!-- _Linting, github pre-push hook - optional_ -->


## Build
<!-- _How to run build_ -->

```
npm run build
```
packages via babel, in `dist` folder

<!-- TODO: might need transpiling? -->

## Tests
<!-- _How to carry out tests_ -->

_NA_

## Deployment
<!-- _How to deploy the code/app into test/staging/production_ -->

On npm 

```
npm run publish:public
```

Runs build and then publishes `dist` folder to npm  with copy of `README` and `package.json`