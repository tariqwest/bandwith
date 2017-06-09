import {
  PHOTO_REQUEST,
  PHOTO_SUCCESS,
  PHOTO_FAILURE,
} from '../actions';

const photo = (state = {
  isFetching: false,
  hasSaved: false,
  errorMessage: '',
  userId: null,
}, action) => {
  switch (action.type) {
  case PHOTO_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case PHOTO_SUCCESS:
    return {
      ...state,
      isFetching: false,
      hasSaved: true,
      errorMessage: '',
      userId: action.userId,
    };
  case PHOTO_FAILURE:
    return {
      ...state,
      isFetching: false,
      errorMessage: action.message,
    };
  default:
    return state;
  }
};

export default photo;
