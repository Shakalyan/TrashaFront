import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { changeTranslateWords } from '../../../store/actions/change-translate-words.jsx';
import { translateWord } from '../../../api-requests.js';
import { store } from '../../../store/store.jsx';
import { addNewTranslationToDictionary } from '../../../api-requests.js';
import { changeAlertMessage } from '../../../store/actions/change-alert-message.jsx';
import { switchLanguages } from '../../../store/actions/switch-languages.jsx';

export default function TranslatorInput() {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let languagesAreSwitched = useSelector((store) => store.languagesAreSwitched);
    let chosenDictionary = useSelector((store) => store.chosenDictionary);

    let onKeyPress = (event) => {
        
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault();
            
            if (chosenDictionary == null) {
                dispatch(changeAlertMessage("Choose dictionary!", true));
                return;
            }

            let state = store.getState();
            let addTranslationRequest = {
                dictionaryId: state.chosenDictionary.id,
                word: (languagesAreSwitched) ? state.translatedWord : state.wordToTranslate,
                translation: (!languagesAreSwitched) ? state.translatedWord : state.wordToTranslate,
            };
            
            addNewTranslationToDictionary(addTranslationRequest).then((response) => {
                if (response.status === 200) {
                    store.dispatch(changeAlertMessage(`${state.wordToTranslate} has been added to the dictionary`));
                } else if (response.status === 404) {
                    console.log('Dictionary not found');
                } else if (response.status === 403) {
                    console.log('You do not have access to this dictionary');
                } else if (response.status === 401) {
                    navigate('/');
                }
            });

        } else if (event.key === 'Enter') {
            event.preventDefault();

            if (chosenDictionary == null) {
                dispatch(changeAlertMessage("Choose dictionary!", true));
                return;
            }

            let wordToTranslate = event.target.value;
            let translateRequest = {
                text: wordToTranslate,
                source: (languagesAreSwitched) ? chosenDictionary.target : chosenDictionary.source,
                target: (!languagesAreSwitched) ? chosenDictionary.target : chosenDictionary.source,
            };
            console.log(translateRequest);

            translateWord(translateRequest).then((response) => {
                if (response.status === 200) {
                    response.json().then((json) => {
                        console.log(json.translatedText);
                        dispatch(changeTranslateWords(event.target.value, json.translatedText));
                    });
                } else if (response.status === 401) {
                    navigate('/');
                }
                
            });

        } else if (event.shiftKey && event.keyCode === 32) {
            event.preventDefault();
            dispatch(switchLanguages());
        }
    
    }

    let wordToTranslate = useSelector((store) => store.wordToTranslate);
    let translatedWord = useSelector((store) => store.translatedWord);
    
    let onTextChange = (event) => {
        dispatch(changeTranslateWords(event.target.value, translatedWord));
    }

    

    return (
        <textarea   className="TranslateInput" 
                    onKeyDown={onKeyPress}
                    onChange={onTextChange}
                    value={wordToTranslate}
        />
    );
}