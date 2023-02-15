export const CHANGE_WORD_TO_TRANSLATE = 'CHANGE_TRANSLATE_WORD';

export function changeTranslateWords(wordToTranslate, translatedWord) {
    return {
        type: CHANGE_WORD_TO_TRANSLATE,
        wordToTranslate: wordToTranslate,
        translatedWord: translatedWord
    }
}