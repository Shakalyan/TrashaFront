import { CHANGE_WORD_TO_TRANSLATE } from '../actions/change-translate-words';
import { SET_TOKEN } from '../actions/set-token.jsx';
import { CHANGE_DICTIONARIES } from '../actions/change-dictionaries.jsx';
import { CHOOSE_DICTIONARY } from '../actions/choose-dictionary';
import { CHANGE_ALERT_MESSAGE } from '../actions/change-alert-message';
import { SWITCH_LANGUAGES } from '../actions/switch-languages';
import { CHOOSE_EXERCISE } from '../actions/choose-exercise';

const initialState = {
    wordToTranslate: "",
    translatedWord: "",
    languagesAreSwitched: false,
    token: "123",
    dictionaries: [],
    chosenDictionary: null,
    alertMessage: {
        message: "Welcome!",
        isError: false
    },
    chosenExercise: "Menu"
}

export function reducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_WORD_TO_TRANSLATE:
            return {
                ...state,
                wordToTranslate: action.wordToTranslate,
                translatedWord: action.translatedWord
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case CHANGE_DICTIONARIES:
            return {
                ...state,
                dictionaries: action.dictionaries
            }
        case CHOOSE_DICTIONARY:
            return {
                ...state,
                chosenDictionary: action.dictionary
            }
        case CHANGE_ALERT_MESSAGE:
            return {
                ...state,
                alertMessage: {
                    message: action.message,
                    isError: action.isError
                }
            }
        case SWITCH_LANGUAGES:
            let temp = state.wordToTranslate;
            return {
                ...state,
                wordToTranslate: state.translatedWord,
                translatedWord: temp,
                languagesAreSwitched: !state.languagesAreSwitched
            }
        case CHOOSE_EXERCISE:
            return {
                ...state,
                chosenExercise: action.exercise
            }
        default:
            return state;
    }
}