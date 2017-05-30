import React from 'react';
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Login from './Login';
import Private from './Private';
import PrivateRoute from './PrivateRoute';

import store from '../store';

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/private">Protected Page</Link></li>
        </ul>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/private" component={Private} />
      </div>
    </Router>
  </Provider>
);

export default App;
