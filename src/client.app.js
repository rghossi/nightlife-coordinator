import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

if (process.env.NODE_ENV !== 'production')
	require('style-loader!css-loader!./static/css/style.css');

window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};