import { SET_USER_LOCATION } from '../actions';

const redirectURL = (state = '/', action) => {
  switch (action.type) {
    case SET_USER_LOCATION:
      return {
        ...state,
        city: action.city,
        county: action.county,
        lat: action.lat,
        lng: action.lng,
        state: action.state,
        state_abbrev: action.state_abbrev,
        zipcode: action.zipcode,
      };
    default:
      return state;
  }
};

export default redirectURL;
