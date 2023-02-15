import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import ControlPanel from './ControlPanel.jsx';
import NavigationBar from './NavigationBar.jsx';
import TranslatorContainer from './containers/translator/TranslatorContainer.jsx';
import DictionaryContainer from './containers/dictionaries/DictionaryContainer.jsx';
import ExercisesContainer from './containers/exercises/ExercisesContainer.jsx';
import AuthenticationCard from './AuthenticationCard.jsx';
import RegistrationCard from './RegistrationCard.jsx';

class MainContainer extends React.Component {

    render() {

        return (
            <div className="MainContainer">
                <ControlPanel />
                <Router>
                    <Routes>
                        <Route path="/*" element={<AuthenticationCard />} />
                        <Route path="/registration" element={<RegistrationCard />} />
                        <Route path="/translator" element={<div><NavigationBar /><TranslatorContainer /></div>} />
                        <Route path="/dictionaries" element={<div><NavigationBar /><DictionaryContainer /></div>} />
                        <Route path="/exercises" element={<div><NavigationBar /><ExercisesContainer /></div>} />
                    </Routes>
                </Router>
            </div>
        );

    }

}

export default MainContainer;