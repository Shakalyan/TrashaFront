import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { deleteDictionary } from "../../../api-requests";

import { store } from "../../../store/store";
import { changeDictionaries } from "../../../store/actions/change-dictionaries";

export default function DictionaryTab({dictionary, clickCallback}) {

    let navigate = useNavigate();

    let onDeleteButtonClick = () => {
        deleteDictionary(dictionary.id).then((response) => {
            if (response.status === 200) {
                let dictionaries = store.getState().dictionaries;
                store.dispatch(changeDictionaries(dictionaries.filter((dict) => dict.id !== dictionary.id)));
            } else if (response.status === 404) {
                console.log("Dictionary not found");
            } else if (response.status === 403) {
                console.log("You do not have access to this dictionary");
            } else if (response.status === 401) {
                navigate('/');
            }
        });
    }

    return (
        <div className="DictionaryTab">
            <p className="DictionaryName" onMouseDown={(event) => clickCallback(event, dictionary)}>{`${dictionary.name} (${dictionary.source} - ${dictionary.target})`}</p>
            <button className="DictionaryButton" onClick={onDeleteButtonClick}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
    );

}