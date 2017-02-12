import { combineReducers } from 'redux'
import {
  SELECT_LOCATION, REQUEST_PLACES, RECEIVE_PLACES
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
        items: action.places,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function placesNearLocation(state = {}, action) {
  switch (action.type) {
    case REQUEST_PLACES:
      return Object.assign({}, state, {
        [action.location]: places(state[action.location], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  placesNearLocation,
  selectedLocation
})

export default rootReducer