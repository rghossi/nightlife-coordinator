import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import { fetchPlaces } from './actions'
import AppRoutes from './components/AppRoutes';

if (process.env.NODE_ENV !== 'production')
	require('style-loader!css-loader!./static/css/style.css');

const loggerMiddleware = createLogger();
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

window.onload = () => {
  ReactDOM.render(<AppRoutes store={store} />, document.getElementById('main'));
};