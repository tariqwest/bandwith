import { USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAILURE } from '../actions';

const matches = (state = { isFetching: false, errorMessage: '', profile: {} }, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case USER_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        profile: action.userInfo,
        errorMessage: '',
      };
    case USER_INFO_FAILURE:
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
