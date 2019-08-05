import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import setAuthorizationToken from './utils/setAuthorizationToken';
import store from './store';
import { setCurrentUser, logout } from './actions/employeeAction';

// let jwt = require('jsonwebtoken');
// if (localStorage.getItem('jwtToken')) {
//     setAuthorizationToken(localStorage.jwtToken);
//     store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
//     console.log(jwt.decode(localStorage.jwtToken));
//     const currentTime = Date.now() / 1000;
//     console.log(currentTime, jwt.decode(localStorage.jwtToken).exp)
//     if (jwt.decode(localStorage.jwtToken).exp < currentTime) {
//         store.dispatch(logout());
//         window.location.href = "/";
//     }
// }



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
