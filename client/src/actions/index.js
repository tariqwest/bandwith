export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SET_REDIRECT_URL = 'SET_REDIRECT_URL';

export const requestLogin = () => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
});

export const receiveLogin = user => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: user.loggedIn,
  id_token: 'PLACE_ID_HERE',
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

export const checkLogin = () => (dispatch) => {
  dispatch(requestLogin());
  return fetch('/auth/status')
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(res => res.json())
    .then(json => dispatch(receiveLogin(json)))
    .catch(err => dispatch(loginError(err.message)));
};
