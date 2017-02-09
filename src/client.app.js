import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/client.app.routes';

window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};