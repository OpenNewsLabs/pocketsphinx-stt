/**
 * 
 * @param {*} word  - works both for word and paragraph
 */
function adjustOffsetTimings(word, offset) {
    word.start += offset;
    word.end += offset;
    return word
}


function recombineSegmentsTimings(files) {

    const wordsResults = [];
    const pragraphsResults = [];

    for (let file of files) {

        const wordAdjustedOffset = file.transcript.words.map((word) => {
            return adjustOffsetTimings(word, file.offset)
        })

        wordsResults.push(...wordAdjustedOffset)

        const paragraphsAdjustedOffset = file.transcript.paragraphs.map((paragraph) => {
            return adjustOffsetTimings(paragraph, file.offset)
        })

        pragraphsResults.push(...paragraphsAdjustedOffset)
    }

    const words = wordsResults.map((word, index) => {
        word.id = index;
        return word;
    })

    const paragraphs = pragraphsResults.map((paragraph, index) => {
        paragraph.id = index;
        return paragraph;
    })

    const transcript = { words, paragraphs };

    return transcript;
}

module.exports = recombineSegmentsTimings;