import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import setAuthorizationToken from './utils/setAuthorizationToken';
import store from './store';
import { setCurrentUser } from './actions/employeeAction';

if(localStorage.getItem('jwtToken')) {
    setAuthorizationToken(localStorage.jwtToken);
    let jwt = require('jsonwebtoken');
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
