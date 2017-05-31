export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const requestLogin = () => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
});

export const receiveLogin = user => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: user.loggedIn,
  userId: user.userId || null,
});

export const loginError = message => ({
  type: LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message,
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

// TODO change this to check if already auth
export const checkLoginIfNeccessary = () => {
  // if not checkLogin
};
