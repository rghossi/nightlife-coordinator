import { combineReducers } from 'redux'
import {
  SELECT_LOCATION, REQUEST_PLACES, RECEIVE_PLACES, LOGIN_REQUEST, RECEIVE_LOGIN_STATUS, LOGOUT_REQUEST, RECEIVE_LOGOUT_STATUS, REQUEST_UPDATE_GOING_PLACES, RECEIVE_UPDATE_GOING_PLACES
} from './actions'

export function selectedLocation(state = '', action) {
  switch (action.type) {
  case SELECT_LOCATION:
    return action.location
  default:
    return state
  }
}

export function places(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_PLACES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_PLACES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export function auth(state = {
    isFetching: false,
    isAuthenticated: false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case RECEIVE_LOGIN_STATUS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: action.isAuthenticated,
        user: action.user
      })
    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true
      })
    case RECEIVE_LOGOUT_STATUS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: action.isAuthenticated,
        user: action.user
      })
    case REQUEST_UPDATE_GOING_PLACES:
    return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true,
        didInvalidate: false
      })
    case RECEIVE_UPDATE_GOING_PLACES:
    return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  places,
  selectedLocation,
  auth
})

export default rootReducer