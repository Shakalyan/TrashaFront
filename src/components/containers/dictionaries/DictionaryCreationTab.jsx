import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";

import { createNewDictionary } from "../../../api-requests";
import { changeDictionaries } from "../../../store/actions/change-dictionaries";
import { store } from "../../../store/store";

import { useDispatch } from "react-redux";
import { changeAlertMessage } from "../../../store/actions/change-alert-message";

export default function DictionaryCreationTab() {

    let nameInputRef = useRef(null);
    let sourceInputRef = useRef(null);
    let targetInputRef = useRef(null);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let onButtonClick = () => {

        const request = {
            name: nameInputRef.current.value,
            source: sourceInputRef.current.value,
            target: targetInputRef.current.value
        }

        if (!request.name.match(/^[\w\s]+$/) || request.name.match(/^\s*$/)) {
            dispatch(changeAlertMessage("Write correct name of the dictionary!", true));
            return;
        }

        if (!request.source.match(/^[a-z]{2}$/)) {
            dispatch(changeAlertMessage("Write correct language!", true));
            return;
        }

        createNewDictionary(request).then((response) => {
            if (response.status === 200) {
                response.json().then((json) => {
                    let dictionaries = store.getState().dictionaries;
                    dictionaries.push(json);
                    store.dispatch(changeDictionaries([...dictionaries]));
                });
            } else if (response.status === 401) {
                navigate('/');
            }            
        });
    }

    return (
        <div className="DictionaryCreationTab">
            <input ref={nameInputRef} type="text" className="DictionaryNameInput"/>
            <div className="DictionaryCreationButtonsGroup">
                <div style={{display: "table"}}>
                    <input ref={sourceInputRef} type="text" className="DictionaryCreationLanguageInput" placeholder="en" defaultValue={"en"} />
                    <input ref={targetInputRef} type="text" className="DictionaryCreationLanguageInput" placeholder="ru" defaultValue={"ru"} />
                    <button className="DictionaryButton" onClick={onButtonClick}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
            </div>
        </div>
    );

}