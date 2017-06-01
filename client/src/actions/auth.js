export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const requestLogin = () => ({
  type: LOGIN_REQUEST,
});

export const receiveLogin = user => ({
  type: LOGIN_SUCCESS,
  isAuthenticated: user.loggedIn,
  userId: user.userId || null,
});

export const loginError = message => ({
  type: LOGIN_FAILURE,
  message,
});

export const requestLogout = () => ({
  type: LOGOUT_REQUEST,
});

export const receiveLogout = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutError = message => ({
  type: LOGOUT_FAILURE,
  message,
});

export const checkLogin = () => (dispatch) => {
  dispatch(requestLogin());

  const options = { credentials: 'include' };

  return fetch('/auth/status', options)
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

export const logout = () => (dispatch) => {
  dispatch(requestLogout());
  const options = { credentials: 'include' };
  return fetch('/auth/logout', options)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(res => res.json())
    .then(() => dispatch(receiveLogout()))
    .catch(err => dispatch(logoutError(err.message)));
};
