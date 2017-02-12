import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';
import configureStore from './configureStore'

if (process.env.NODE_ENV !== 'production')
	require('style-loader!css-loader!./static/css/style.css');

const store = configureStore();

window.onload = () => {
  ReactDOM.render(<AppRoutes store={store} />, document.getElementById('main'));
};