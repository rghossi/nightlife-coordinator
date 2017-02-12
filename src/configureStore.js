import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const loggerMiddleware = createLogger();
export default function configureStore(preLoadedState) {
	return createStore(reducer, preLoadedState, 
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	)
}