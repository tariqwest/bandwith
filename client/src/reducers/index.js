import { combineReducers } from 'redux';
import auth from './auth';
import redirectURL from './redirectURL';

// We combine the reducers here
const rootReducer = combineReducers({
  auth,
  redirectURL,
});

export default rootReducer;
