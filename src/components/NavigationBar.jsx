import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getUserDictionaries } from '../api-requests';
import { store } from '../store/store';
import { changeDictionaries } from '../store/actions/change-dictionaries';
import { chooseExercise } from '../store/actions/choose-exercise';
import { ExercisesTypes } from './containers/exercises/ExercisesTypes';

export default function NavigationBar() {

    let navigate = useNavigate();

    let dictionariesCallback = () => {
        getUserDictionaries().then((response) => {
            if (response.status === 200) {
                response.json().then((json) => {
                    store.dispatch(changeDictionaries(json));
                });
            } else if (response.status === 401) {
                navigate('/');
            }            
        });
    }

    let exercisesCallback = () => {
        store.dispatch(chooseExercise(ExercisesTypes.menu));
    }

    return (
        <nav className="NavigationBar">
            <Link className="NavigationTab" to="/translator">Translator</Link>
            <Link className="NavigationTab" to="/dictionaries" onClick={dictionariesCallback}>Dictionaries</Link>
            <Link className="NavigationTab" to="/exercises" onClick={exercisesCallback}>Exercises</Link>
        </nav>
    );

}