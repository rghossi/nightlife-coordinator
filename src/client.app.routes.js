import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import { fetchPlaces } from './actions'

const loggerMiddleware = createLogger();
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

const routes = (
  <Provider store={store}>
	  <Route path="/" component={Layout}>
	    <IndexRoute component={IndexPage}/>
	    <Route path="*" component={NotFoundPage}/>
	  </Route>
  </Provider>
);

export default routes;