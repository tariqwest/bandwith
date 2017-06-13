import axios from 'axios';

export const RESULTS_INFO_REQUEST = 'RESULTS_INFO_REQUEST';
export const RESULTS_INFO_SUCCESS = 'RESULTS_INFO_SUCCESS';
export const RESULTS_INFO_FAILURE = 'RESULTS_INFO_FAILURE';
export const RESULTS_ACTION_REQUEST = 'RESULTS_ACTION_REQUEST';
export const RESULTS_ACTION_SUCCESS = 'RESULTS_ACTION_SUCCESS';
export const RESULTS_ACTION_FAILURE = 'RESULTS_ACTION_FAILURE';
export const RESULTS_SET_CURRENT = 'RESULTS_SET_CURRENT';

export const requestResultsInfo = () => ({
  type: RESULTS_INFO_REQUEST,
  isFetching: true,
});

export const receiveResultsInfo = results => ({
  type: RESULTS_INFO_SUCCESS,
  isFetching: false,
  results,
});

export const resultsInfoError = message => ({
  type: RESULTS_INFO_FAILURE,
  isFetching: false,
  message,
});


export const getResultsInfo = userId => (dispatch) => {
  dispatch(requestResultsInfo());
  return axios.get(`/api/search?userId=${userId}`)
    .then((response) => {
      if (response.statusText !== 'OK') {
        throw Error(response.statusText);
      }
      return response.data;
    })
    .then(res => (
      Promise.all(res.map(result => (
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${result.zipcode}&key=${process.env.CONFIG.apiKeys.google}`)
          .then((response) => {
            const location = {
              location: response.data.results[0].formatted_address,
            };
            return Object.assign(result, location);
          })
      )))
    ))
    .then(res => dispatch(receiveResultsInfo(res)))
    .catch(err => dispatch(resultsInfoError(err.message)));
};

export const requestResultsAction = () => ({
  type: RESULTS_ACTION_REQUEST,
  isFetching: true,
});

export const resultsActionSuccess = () => ({
  type: RESULTS_ACTION_SUCCESS,
  isFetching: false,
});

export const resultsActionFailure = message => ({
  type: RESULTS_ACTION_FAILURE,
  isFetching: false,
  message,
});

export const sendResultsAction = (choice, userId, currentResultId) => (dispatch) => {
  dispatch(requestResultsAction());
  const body = {
    userId,
    profileId: currentResultId,
    choice,
  };

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  };

  fetch('/api/preference', options)
    .then(() => dispatch(resultsActionSuccess()))
    .catch(err => dispatch(resultsActionFailure(err)));
};
