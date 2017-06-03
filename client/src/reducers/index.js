import { combineReducers } from 'redux';

import auth from './auth';
import redirectURL from './redirectURL';
import chat from './chat';
import matches from './matches';
import signup from './signup';
import user from './user';

const rootReducer = combineReducers({
  auth,
  redirectURL,
  chat,
  matches,
  signup,
  user,
});

export default rootReducer;
