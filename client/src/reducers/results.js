import {
  RESULTS_INFO_REQUEST,
  RESULTS_INFO_SUCCESS,
  RESULTS_INFO_FAILURE,
  RESULTS_ACTION_REQUEST,
  RESULTS_ACTION_SUCCESS,
  RESULTS_ACTION_FAILURE,
} from '../actions';

const results = (state = {
  isFetchingResults: false,
  errorMessage: '',
  results: [],
}, action) => {
  switch (action.type) {
    case RESULTS_INFO_REQUEST:
      return {
        ...state,
        isFetchingResults: true,
      };
    case RESULTS_INFO_SUCCESS:
      return {
        ...state,
        isFetchingResults: false,
        results: action.results,
        errorMessage: '',
      };
    case RESULTS_INFO_FAILURE:
      return {
        ...state,
        isFetchingResults: false,
        errorMessage: action.message,
      };
    case RESULTS_ACTION_REQUEST:
      return {
        ...state,
        isFetchingResults: true,
      };
    case RESULTS_ACTION_SUCCESS:
      return {
        ...state,
        isFetchingResults: false,
        results: state.results.slice(1),
        errorMessage: '',
      };
    case RESULTS_ACTION_FAILURE:
      return {
        ...state,
        isFetchingResults: false,
        errorMessage: action.message,
      };
    default:
      return state;
  }
};

export default results;
