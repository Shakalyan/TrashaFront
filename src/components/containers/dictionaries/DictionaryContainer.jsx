import DictionaryTab from './DictionaryTab.jsx';
import DictionaryCreationTab from './DictionaryCreationTab.jsx';
import WordTab from './WordTab.jsx';
import { getTranslationsFromDictionary } from '../../../api-requests.js';
import { chooseDictionary } from '../../../store/actions/choose-dictionary.jsx';
import { changeAlertMessage } from '../../../store/actions/change-alert-message.jsx';
import { deleteTranslationFromDictionary } from "../../../api-requests";

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DictionaryContainer() {

    let [showWords, setShowWords] = useState(false);
    let [words, setWords] = useState([]);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let dictionaries = useSelector((store) => store.dictionaries);

    let dictTabClickCallback = (event, dictionary) => {
        
        if (event.nativeEvent.button === 0) {
            setShowWords(true);
            getTranslationsFromDictionary(dictionary.id).then((response) => {
                if (response.status === 200) {
                    response.json().then((json) => {
                        setWords(json);
                    });
                } else if (response.status === 404) {
                    console.log('Dictionary not found');
                } else if (response.status === 403) {
                    console.log('You do not have access to this dictionary');
                } else if (response.status === 401) {
                    navigate('/');
                }                    
            });

        } else if (event.button === 1) {
            dispatch(chooseDictionary({...dictionary}));
            dispatch(changeAlertMessage(`${dictionary.name} has been choosen`));
        }
    }

    let showDictionaries = () => {
        setShowWords(false);
    }

    let wordTabMiddleMouseCallback = (event, translationId) => {
        if (event.button === 1) {
            deleteTranslationFromDictionary(translationId).then((response) => {
                if (response.status === 200) {
                    setWords(words.filter((word) => {
                        return word.id !== translationId;
                    }));
                } else if (response.status === 404) {
                    console.log('Dictionary not found');
                } else if (response.status === 403) {
                    console.log('You do not have access to this dictionary');
                } else if (response.status === 401) {
                    navigate('/');
                }
            });
        } 
    }

    let dictionariesList = dictionaries.map((dict) => <DictionaryTab    dictionary={dict}
                                                                    key={dict.id}
                                                                    clickCallback={dictTabClickCallback} />);

    let wordsList = words.map((word) => <WordTab    word={word.word} 
                                                    translation={word.translation}
                                                    id={word.id}
                                                    onMouseDownCallback={wordTabMiddleMouseCallback}
                                                    key={word.id} />);

    return (
        <div className="BLContainer DictionaryContainer">
            {showWords 
            ?
            <div>
                <div className="DictionaryWordsList CustomScrollbar">
                    {wordsList}
                </div>
                <button className="WordsListReturnButton" onClick={showDictionaries}>Return</button>
            </div>
            : 
            <div>
                <DictionaryCreationTab />
                <div className="DictionariesList CustomScrollbar">
                    {dictionariesList}
                </div>
            </div>
            }
        </div>
    );

}