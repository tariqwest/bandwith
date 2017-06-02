import { combineReducers } from 'redux';
import auth from './auth';
import redirectURL from './redirectURL';
import chat from './chat';

// We combine the reducers here
const rootReducer = combineReducers({
  auth,
  redirectURL,
  chat,
});

export default rootReducer;
