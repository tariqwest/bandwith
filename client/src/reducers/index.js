import { combineReducers } from 'redux';
import auth from './auth';

// We combine the reducers here
const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
