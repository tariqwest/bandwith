import { combineReducers } from 'redux';
import auth from './auth';
import redirectUrl from './redirectUrl';

// We combine the reducers here
const rootReducer = combineReducers({
  auth,
  redirectUrl,
});

export default rootReducer;
