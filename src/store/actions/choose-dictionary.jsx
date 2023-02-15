export const CHOOSE_DICTIONARY = "CHOOSE_DICTIONARY";

export function chooseDictionary(dictionary) {
    return {
        type: CHOOSE_DICTIONARY,
        dictionary: dictionary
    }
}