import { USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAILURE } from '../actions';

const user = (state = { isFetching: false, errorMessage: '', profile: {}, hasInfo: false }, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasInfo: false,
      };
    case USER_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        profile: action.userInfo,
        hasInfo: true,
        errorMessage: '',
      };
    case USER_INFO_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasInfo: false,
        errorMessage: action.message,
      };
    default:
      return state;
  }
};

export default user;
