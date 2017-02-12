import fetch from 'isomorphic-fetch'

export const SELECT_LOCATION = 'SELECT_LOCATION'
export function selectLocation(location) {
  return {
    type: SELECT_LOCATION,
    location
  }
}

export const REQUEST_PLACES = 'REQUEST_PLACES'
export function requestPlaces(location) {
  return {
    type: REQUEST_PLACES,
    location
  }
}

export const RECEIVE_PLACES = 'RECEIVE_PLACES'
export function receivePlaces(location, json) {
  return {
    type: RECEIVE_PLACES,
    location,
    places: json.places,
    receivedAt: Date.now()
  }
}

function fetchPlaces(location) {
  return function (dispatch) {
    dispatch(requestPlaces(location));
    //REMOVE 2 lines below after integrating with proper API
    dispatch(receivePlaces(location, {places: ["Miracema", "Padua"]}));
    return;
    return fetch("INSERT_API_URL")
      .then(response => response.json())
      .then(json =>
        dispatch(receivePlaces(location, json))
      )
  }
}