export const SET_USER_LOCATION = 'SET_USER_LOCATION';

export const setUserLocation = ({ city, county, lat, lng, state, state_abbrev, zipcode }) => ({
  type: SET_USER_LOCATION,
  city,
  county,
  lat,
  lng,
  state,
  state_abbrev,
  zipcode,
});
