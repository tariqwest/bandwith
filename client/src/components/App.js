import React from 'react';
import { Provider } from 'react-redux';
import Test from './Test';
import Matches from './Matches';
import Results from './Results';
import Login from './Login';
import Private from './Private';
import PrivateRoute from './PrivateRoute';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

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
        <Route path="/test" component={Test} />
        <Route path="/connections" component={Matches} />
        <Route path="/results" component={Results} />
      </div>
    </Router>
  </Provider>
);

export default App;
