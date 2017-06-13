import { SET_USER_LOCATION } from '../actions';

const redirectURL = (state = '/', action) => {
  switch (action.type) {
    case SET_USER_LOCATION:
      return {
        ...state,
        location: action.location,
      };
    default:
      return state;
  }
};

export default redirectURL;
