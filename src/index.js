import React from 'react';
import ReactDOM from 'react-dom';
// import dateFnsLocalizer from 'react-widgets-date-fns';

import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './assets/css/style.css'
// import * as serviceWorker from './serviceWorker';

import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers/index.js';

// dateFnsLocalizer()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

if(window.addEventListener) {
  window.addEventListener("storage", onSessionChange, false);
} else {
  window.attachEvent("onstorage", onSessionChange);
};

let IS_RENDERED = false;

function onSessionChange(event) {
  if(!event) { event = window.event; }
  if(!event.newValue) return;

  if (event.key === 'getSessionStorage') {
    localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
    localStorage.removeItem('sessionStorage');
  } else if (event.key === 'sessionStorage' && !sessionStorage.length) {
    const data = JSON.parse(event.newValue);
    for (var key in data) {
      sessionStorage.setItem(key, data[key]);
    }

    render()
  }
};

function render(){
  if(IS_RENDERED){
    return;
  }

  let sessionData = JSON.parse(sessionStorage.getItem('sessionData')) || false
  let currentUser = JSON.parse(sessionStorage.getItem('user')) || false
  // let role = JSON.parse(sessionStorage.getItem('role')) || false

  IS_RENDERED = true;

  const store = createStore(
    reducers,
    {
      auth: {
        isLoggedIn: !!sessionData.token,
        token: sessionData.token,
        currentUser: currentUser
      }
    },
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
      ),
    )
  );

  ReactDOM.render(
    <Provider store={store}>
      <App store={store} />
    </Provider>,
    document.getElementById('root')
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  //serviceWorker.register();
}

localStorage.setItem('getSessionStorage', 'foobar');
localStorage.removeItem('getSessionStorage', 'foobar');
// serviceWorker.register();

setTimeout(render, 50)

