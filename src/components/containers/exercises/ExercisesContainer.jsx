import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { switchLanguages } from '../../../store/actions/switch-languages';
import { chooseExercise } from '../../../store/actions/choose-exercise';
import { ExercisesTypes } from './ExercisesTypes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

import { getTranslationsFromDictionary } from '../../../api-requests';
import { changeAlertMessage } from '../../../store/actions/change-alert-message';

export default function ExercisesContainer() {

    let dispatch = useDispatch();
    let navigate = useNavigate();
    let languagesAreSwitched = useSelector((store) => store.languagesAreSwitched);
    let dictionary = useSelector((store) => store.chosenDictionary);
    let exerciseType = useSelector((store) => store.chosenExercise);

    let onSwitchButtonClick = () => {
        dispatch(switchLanguages());
    }

    let source = '?';
    let target = '?';
    if (dictionary != null) {
        source = (languagesAreSwitched) ? dictionary.target : dictionary.source;
        target = (!languagesAreSwitched) ? dictionary.target : dictionary.source;
    }

    let [translations, setTranslations] = useState(null);
    let [testIsStarted, setTestIsStarted] = useState(false);
    let [currentTranslation, setCurrentTranslation] = useState(null);
    let [answer, setAnswer] = useState("");
    let [correctAnswers, setCorrectAnswers] = useState(0);
    let [wrongAnswers, setWrongAnswers] = useState(0);

    let typingExerciseOnClick = () => {
        dispatch(chooseExercise(ExercisesTypes.typing));
    }

    useEffect(() => {
        if (testIsStarted) {
            getTranslationsFromDictionary(dictionary.id).then((response) => {
                if (response.status === 200) {
                    response.json().then((json) => {
                        setTranslations(json);
                        console.log(json);
                    });
                } else if (response.status === 404) {
                    console.log('Dictionary not found');
                } else if (response.status === 403) {
                    console.log('You do not have access to this dictionary');
                } else if (response.status === 401) {
                    navigate('/');
                }
                
            });
        }
    }, [testIsStarted, dictionary])

    useEffect(() => {
        if (!translations)
            return;

        if (translations.length === 0) {
            console.log("ZERO");
            setCurrentTranslation(null);
            setTestIsStarted(false);
            return;
        }

        let index = Math.floor(Math.random() * translations.length);
        let curTr = translations[index];
        if (languagesAreSwitched) {
            let temp = curTr.word;
            curTr.word = curTr.translation;
            curTr.translation = temp;
        }
        setCurrentTranslation(curTr);

    }, [translations]);

    let updateTranslations = () => {
        setTranslations(translations.filter((translation) => translation.id !== currentTranslation.id));
    }

    let typingInputOnChange = (event) => {
        if (event.key === 'Enter') {
            if (!testIsStarted) {
                if (dictionary == null) {
                    dispatch(changeAlertMessage('Choose dictionary!', true));
                    return;
                }
                setCorrectAnswers(0);
                setWrongAnswers(0);
                setTestIsStarted(true);
                setAnswer("");
                return;
            }
            setAnswer(`Answer: ${currentTranslation.translation}`);
            setWrongAnswers(wrongAnswers + 1);
            event.target.value = "";
            updateTranslations();
        } else {
            console.log(event.target.value);
            if (currentTranslation && event.target.value === currentTranslation.translation) {
                setAnswer("Correct!");
                setCorrectAnswers(correctAnswers + 1);
                updateTranslations();
                event.target.value = "";
            }
        }
    }

    return (
        <div className="BLContainer ExercisesContainer">
            <div className="ExercisesControlPanel">
                <p className="TranslateLanguageField">{source}</p>
                <button className="TranslateManageButton" onClick={onSwitchButtonClick}><FontAwesomeIcon icon={faArrowsRotate} /></button>
                <p className="TranslateLanguageField">{target}</p>
            </div>
            {exerciseType === ExercisesTypes.menu &&
                <div className="ExercisesList">
                    <button className="ExercisesListButton" onClick={typingExerciseOnClick}>Typing text</button>
                </div>
            }
            {exerciseType === ExercisesTypes.typing &&
                <div>
                    <div className="TypingExerciseContainer">
                        <p className="TypingExerciseTextfield">{(currentTranslation) ? currentTranslation.word : "Press enter to start"}</p>
                        <input className="TypingExerciseInputField" onKeyUp={typingInputOnChange}/>
                        <p className="TypingExerciseTextfield">{answer}</p>
                    </div>
                    <div className="ExercisesStatistics">
                        <p className="ExercisesStatisticsTextField">{`Words remaining: ${(!translations) ? 0 : translations.length}`}</p>
                        <p className="ExercisesStatisticsTextField">{`Correct answers: ${correctAnswers}`}</p>
                        <p className="ExercisesStatisticsTextField">{`Wrong answers: ${wrongAnswers}`}</p>
                        <p className="ExercisesStatisticsTextField">{`Percent: ${(correctAnswers + wrongAnswers === 0) ? 0 : Math.floor(correctAnswers / (correctAnswers + wrongAnswers) * 100)}%`}</p>
                    </div>
                </div>
            }
        </div>
    );

}