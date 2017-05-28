import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Login from './Login';
import Private from './Private';
import Test from './Test';

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/private">Protected Page</Link></li>
      </ul>
      <Test />
      <Route path="/login" component={Login} />
      <Route path="/private" component={Private} />
      <Route path="/test" component={Test} />
    </div>
  </Router>
);

export default App;
