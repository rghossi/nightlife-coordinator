import fetch from 'isomorphic-fetch'

export const SELECT_LOCATION = 'SELECT_LOCATION'
export const REQUEST_PLACES = 'REQUEST_PLACES'
export const RECEIVE_PLACES = 'RECEIVE_PLACES'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const RECEIVE_LOGIN_STATUS = 'RECEIVE_LOGIN_STATUS'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const RECEIVE_LOGOUT_STATUS = 'RECEIVE_LOGOUT_STATUS'

export function selectLocation(location) {
  return {
    type: SELECT_LOCATION,
    location
  }
}

function requestPlaces(location) {
  return {
    type: REQUEST_PLACES,
    location
  }
}

function receivePlaces(location, json) {
  console.log(json);
  return {
    type: RECEIVE_PLACES,
    location,
    items: json.results,
    receivedAt: Date.now()
  }
}

export function fetchPlaces(location) {
  return function (dispatch) {
    dispatch(requestPlaces(location));
    return fetch(`/api/places/${location}`)
      .then(response => response.json())
      .then(json =>
        dispatch(receivePlaces(location, json))
      )
  }
}

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  }
}

function receiveLogin(json) {
  return {
    type: RECEIVE_LOGIN_STATUS,
    isFetching: false,
    isAuthenticated: json.isAuthenticated,
    user: json.user
  }
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout(json) {
  return {
    type: RECEIVE_LOGOUT_STATUS,
    isFetching: false,
    isAuthenticated: json.isAuthenticated,
    user: json.user
  }
}

export function logout() {
  return function (dispatch) {
    dispatch(requestLogout());
    return fetch("/api/logout", {credentials: 'same-origin'})
      .then(response => response.json())
      .then(json =>
        dispatch(receiveLogout(json))
      )
  }
}

export function isLoggedIn() {
  return function (dispatch) {
    dispatch(requestLogin());
    return fetch("/api/isLoggedIn", {credentials: 'same-origin'})
      .then(response => response.json())
      .then(json =>
        dispatch(receiveLogin(json))
      )
  }
}