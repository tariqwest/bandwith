import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../actions';

const auth = (state = {
  isFetching: false,
  isAuthenticated: false,
  errorMessage: '',
  userId: null,
}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: action.isAuthenticated,
        errorMessage: '',
        userId: action.userId,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        userId: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message,
      };
    default:
      return state;
  }
};

export default auth;
