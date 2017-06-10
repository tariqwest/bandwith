import { getUserInfo } from './user';

export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'UPDATE_FAILURE';


export const requestUpdate = () => ({
  type: UPDATE_REQUEST,
});

export const receiveUpdate = () => ({
  type: UPDATE_SUCCESS,
});

export const updateError = message => ({
  type: UPDATE_FAILURE,
  message,
});

export const updateProfile = profile => (dispatch) => {
  dispatch(requestUpdate());

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(profile),
    headers,
  };

  return fetch('/api/signup', options)
    .then(res => res.text())
    .then(() => dispatch(receiveUpdate()))
    .then(() => dispatch(getUserInfo(profile.id)))
    .catch(err => dispatch(updateError(err)));
};
