import {
  PHOTO_REQUEST,
  PHOTO_SUCCESS,
  PHOTO_FAILURE,
} from '../actions';

const photo = (state = {
  isFetchingPhoto: false,
  hasSaved: false,
  errorMessage: '',
  userId: null,
}, action) => {
  switch (action.type) {
  case PHOTO_REQUEST:
    return {
      ...state,
      isFetchingPhoto: true,
    };
  case PHOTO_SUCCESS:
    return {
      ...state,
      isFetchingPhoto: false,
      hasSaved: true,
      errorMessage: '',
      userId: action.userId,
    };
  case PHOTO_FAILURE:
    return {
      ...state,
      isFetchingPhoto: false,
      errorMessage: action.message,
    };
  default:
    return state;
  }
};

export default photo;
