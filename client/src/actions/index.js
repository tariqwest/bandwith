export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SET_REDIRECT_URL = 'SET_REDIRECT_URL';

export const requestLogin = credentials => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  credentials,
});

export const receiveLogin = user => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  id_token: user.id_token,
});

export const loginError = message => ({
  type: LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message,
});

export const setRedirectUrl = url => ({
  type: SET_REDIRECT_URL,
  url,
});
