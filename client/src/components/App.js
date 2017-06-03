import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Matches from './Matches';
import Results from './Results';
import Chats from './Chats';
import Login from './Login';
import Logout from './Logout';
import Private from './Private';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';
import Signup from './Signup';
import store from '../store';

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/logout">Logout</Link></li>
          <li><Link to="/private">Protected Page</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/chats">Chats</Link></li>
          <li><Link to="/connections">Connections</Link></li>
          <li><Link to="/results">Musicians</Link></li>
        </ul>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <PrivateRoute path="/private" component={Private} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/connections" component={Matches} />
        <PrivateRoute path="/results" component={Results} />
        <PrivateRoute path="/chats" component={Chats} />
        <Route path="/signup" component={Signup} />
      </div>
    </Router>
  </Provider>
);

export default App;
