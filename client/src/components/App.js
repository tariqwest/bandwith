import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Test from './Test';
import Matches from './Matches';
import Results from './Results';
import Chats from './Chats';
import Login from './Login';
import Logout from './Logout';
import Private from './Private';
import PrivateRoute from './PrivateRoute';
import store from '../store';

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/logout">Logout</Link></li>
          <li><Link to="/private">Protected Page</Link></li>
          <li><Link to="/chats">Chats</Link></li>
        </ul>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <PrivateRoute path="/private" component={Private} />
        <Route path="/test" component={Test} />
        <Route path="/connections" component={Matches} />
        <Route path="/results" component={Results} />
        <PrivateRoute path="/chats" component={Chats} />
      </div>
    </Router>
  </Provider>
);

export default App;
