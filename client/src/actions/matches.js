import axios from 'axios';

export const MATCHES_INFO_REQUEST = 'MATCHES_INFO_REQUEST';
export const MATCHES_INFO_SUCCESS = 'MATCHES_INFO_SUCCESS';
export const MATCHES_INFO_FAILURE = 'MATCHES_INFO_FAILURE';

export const requestMatchesInfo = () => ({
  type: MATCHES_INFO_REQUEST,
  isFetching: true,
});

export const receiveMatchesInfo = matches => ({
  type: MATCHES_INFO_SUCCESS,
  isFetching: false,
  matches,
});

export const matchesInfoError = message => ({
  type: MATCHES_INFO_FAILURE,
  isFetching: false,
  message,
});

export const getMatchesInfo = userId => (dispatch) => {
  dispatch(requestMatchesInfo());
  return axios.get(`/api/connections?userId=${userId}`)
    .then((response) => {
      if (response.statusText !== 'OK') {
        throw Error(response.statusText);
      }
      return response.data;
    })
    .then(res => dispatch(receiveMatchesInfo(res)))
    .catch(err => dispatch(matchesInfoError(err.message)));
};
