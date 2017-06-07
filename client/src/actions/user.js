import axios from 'axios';
import { setUserLocation } from './location';

export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILURE = 'USER_INFO_FAILURE';

export const requestUserInfo = () => ({
  type: USER_INFO_REQUEST,
});

export const receiveUserInfo = userInfo => ({
  type: USER_INFO_SUCCESS,
  userInfo,
});

export const userInfoError = message => ({
  type: USER_INFO_FAILURE,
  message,
});

export const getUserInfo = userId => (dispatch) => {
  dispatch(requestUserInfo());
  return fetch(`/api/profiles/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveUserInfo(json));
      return json;
    })
    .then((json) => {
      axios.get(`/api/location/${json.zipCode}`)
        .then((response) => {
          dispatch(setUserLocation(response.data));
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch(err => dispatch(userInfoError(err.message)));
};
