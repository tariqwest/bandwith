import axios from 'axios';

export const MATCHES_INFO_REQUEST = 'MATCHES_INFO_REQUEST';
export const MATCHES_INFO_SUCCESS = 'MATCHES_INFO_SUCCESS';
export const MATCHES_INFO_FAILURE = 'MATCHES_INFO_FAILURE';

export const requestMatchesInfo = () => ({
  type: MATCHES_INFO_REQUEST,
  isFetching: true,
});

export const receiveMatchInfo = matchInfo => ({
  type: MATCHES_INFO_SUCCESS,
  isFetching: false,
  matchInfo,
});

export const matchInfoError = message => ({
  type: MATCHES_INFO_FAILURE,
  isFetching: false,
  message,
});

export const getMatchesInfo = userId => (dispatch) => {
  dispatch(requestMatchesInfo());

  return axios.get(`/api/connections/info?userId=${userId}`)
    .then((response) => {
      if (response.statusText !== 'OK') {
        throw Error(response.statusText);
      }
      return response.data;
    })
    .then(res => dispatch(receiveMatchInfo(res)))
    .catch(err => dispatch(matchInfoError(err.message)));
};
