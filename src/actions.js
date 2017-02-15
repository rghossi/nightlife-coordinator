import fetch from 'isomorphic-fetch'

export const SELECT_LOCATION = 'SELECT_LOCATION'
export const REQUEST_PLACES = 'REQUEST_PLACES'
export const RECEIVE_PLACES = 'RECEIVE_PLACES'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const RECEIVE_LOGIN_STATUS = 'RECEIVE_LOGIN_STATUS'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const RECEIVE_LOGOUT_STATUS = 'RECEIVE_LOGOUT_STATUS'
export const REQUEST_UPDATE_GOING_PLACES = 'REQUEST_UPDATE_GOING_PLACES'
export const RECEIVE_UPDATE_GOING_PLACES = 'RECEIVE_UPDATE_GOING_PLACES'

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

function requestUpdateGoingPlaces() {
  return {
    type: REQUEST_UPDATE_GOING_PLACES,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveUpdateGoingPlaces(user) {
  return {
    type: RECEIVE_UPDATE_GOING_PLACES,
    isFetching: false,
    isAuthenticated: true,
    user: json
  }
}

export function updateUser(user) {
  return function (dispatch) {
    dispatch(requestUpdateGoingPlaces());
    return fetch("/api/users/" + user._id, {
        credentials: 'same-origin',
        method: 'PUT',
        body: Json.stringify({going: user.going})
      })
      .then(response => response.json())
      .then(json =>
        dispatch(receiveUpdateGoingPlaces(json))
      )
  }
}