import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './client.app.routes';

window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};