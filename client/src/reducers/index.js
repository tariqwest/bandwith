import { combineReducers } from 'redux';
import auth from './auth';
import redirectURL from './redirectURL';
import chat from './chat';
import matches from './matches';

// We combine the reducers here
const rootReducer = combineReducers({
  auth,
  redirectURL,
  chat,
  matches,
});

export default rootReducer;
