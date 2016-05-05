# Offline speech to text

Speech to text module extracted from Video grep, mac app.

It uses Pocketshphinx and ffmpeg binraries for os x. To run on a linux server you'd need to get(or compile) those binaries for linux.

Pocketshphinx is set with American english dictionary.

## Refactoring in progress

Refactoring in progress, more info coming soon...


## Usage

See `./tests/test_main.js` as an example on how to get an srt from a video file. 
If prefered you can also get a json "hypertranscripts" with word accurate timings instead.

## Structure

- [X] Video to audio (following pocketSphinx specs)  
  - `video_to_audio_for_pocketsphinx.js`
- [X] Audio to text (pocketSphinx speech to text)
  - `pocketsphinx.js`
- [X] Pocketshphinx text to hypertranscript
  - `pocketsphinx_converter.js`
- [X] hypertranscript to srt
  - `hypertranscript_to_srt.js`


## To check
when converting to pocketsphinx text string, by not saving to file, this might overload the memory. so worth doing a test with an hour long transcription and see how it goes.  


## Credit
Initial code from Video grep Mac OSX Electron app by Sam Lavine [@sam_lavigne](https://twitter.com/sam_lavigne)
