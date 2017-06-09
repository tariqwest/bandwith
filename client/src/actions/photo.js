import { getUserInfo } from './user';

export const PHOTO_REQUEST = 'PHOTO_REQUEST';
export const PHOTO_SUCCESS = 'PHOTO_SUCCESS';
export const PHOTO_FAILURE = 'PHOTO_FAILURE';


export const requestPhoto = () => ({
  type: PHOTO_REQUEST,
});

export const receivePhoto = () => ({
  type: PHOTO_SUCCESS,
});

export const photoError = message => ({
  type: PHOTO_FAILURE,
  message,
});

export const updatePhoto = profile => (dispatch) => {
  dispatch(requestPhoto());

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(profile),
    headers,
  };

  return fetch('/api/photo', options)
    .then(res => res.text())
    .then(json => console.log(json))
    .then(() => dispatch(getUserInfo(profile.id)))
    .catch(err => console.log(err));
};
