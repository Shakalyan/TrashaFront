import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css'
import './css/general.css';
import './css/containers/gen-container.css';
import './css/containers/translator.css';
import './css/containers/dictionaries.css';
import './css/containers/exercises.css';

import App from './components/App.jsx';

import { store } from './store/store.jsx';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);