export const CHANGE_DICTIONARIES = "CHANGE_DICTIONARIES";

export function changeDictionaries(dictionaries) {
    return {
        type: CHANGE_DICTIONARIES,
        dictionaries: dictionaries
    }
}