import { createStore } from 'redux';

import { reducer } from './reducers/reducer.jsx';

export let store = createStore(reducer);