import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import * as serviceWorker from './serviceWorker';
import reducer from './reducers';
import rootSaga from './saga';
import App from './App/App';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    compose(
        applyMiddleware(sagaMiddleware),
        // Required for the redux devtools extension
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

sagaMiddleware.run(rootSaga);

function render() {
    const state = store.getState();
    ReactDOM.render(
        <App state={state}
             store={store}/>,
        document.getElementById('root')
    )
}

render();
store.subscribe(render);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
