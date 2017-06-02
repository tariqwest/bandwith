import { MATCHES_INFO_REQUEST, MATCHES_INFO_SUCCESS, MATCHES_INFO_FAILURE } from '../actions';

const matches = (state = { isFetching: false, errorMessage: '', matchInfo: [] }, action) => {
  switch (action.type) {
    case MATCHES_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case MATCHES_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        matchInfo: [...state.matchInfo, action.matchInfo],
        errorMessage: '',
      };
    case MATCHES_INFO_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message,
      }; 
    default:
      return state;
  }
};

export default matches;
