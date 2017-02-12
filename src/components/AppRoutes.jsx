import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../client.app.routes';
import { Provider } from 'react-redux';

export default class AppRoutes extends React.Component {
  render() {
    return (
    	<Provider store={this.props.store}>
      		<Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
      	</Provider>
    );
  }
}