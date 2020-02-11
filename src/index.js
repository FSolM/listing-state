import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import sessionReducer from './reducers/session';

import App from './App';

import * as serviceWorker from './serviceWorker';

const store = createStore(sessionReducer)

import './css/tejuino.css'

ReactDOM.render(
    <Provider store = { store }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>, document.getElementById('root'));

serviceWorker.register();
