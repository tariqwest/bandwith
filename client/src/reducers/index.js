import { combineReducers } from 'redux';

import auth from './auth';
import redirectURL from './redirectURL';
import chat from './chat';
import matches from './matches';
import signup from './signup';
import user from './user';
import results from './results';
import location from './location';

const rootReducer = combineReducers({
  auth,
  redirectURL,
  chat,
  matches,
  signup,
  user,
  results,
  location,
});

export default rootReducer;
