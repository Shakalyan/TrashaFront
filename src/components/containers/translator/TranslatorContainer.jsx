import React from 'react';

import TranslatorInput from './TranslatorInput.jsx';
import TranslatorOutput from './TranslatorOutput.jsx';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import { switchLanguages } from '../../../store/actions/switch-languages.jsx';

export default function TranslatorContainer() {

    let chosenDictionary = useSelector((store) => store.chosenDictionary);
    let languagesAreSwitched = useSelector((store) => store.languagesAreSwitched);
    let source = "?";
    let target = "?";
    if (chosenDictionary != null) {
        source = (languagesAreSwitched) ? chosenDictionary.target : chosenDictionary.source;
        target = (!languagesAreSwitched) ? chosenDictionary.target : chosenDictionary.source;
    }

    let dispatch = useDispatch();

    let onSwitchLanguagesClick = () => {
        dispatch(switchLanguages());
    }

    return (
        <div className="BLContainer TranslatorContainer">
            <div className="TranslateMainDiv">
                <div className="TranslateManagePanel">
                    <p className="TranslateLanguageField">{source}</p>
                    <button className="TranslateManageButton" onClick={onSwitchLanguagesClick}><FontAwesomeIcon icon={faArrowsRotate} /></button>
                    <p className="TranslateLanguageField">{target}</p>
                </div>
                <div className="TranslateInputDiv">
                    <TranslatorInput value="asdf" />
                    <TranslatorOutput />
                </div>
            </div>
        </div>
    );

}