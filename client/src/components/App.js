import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Matches from './Matches';
import Results from './Results';
import Chats from './Chats';
import Login from './Login';
import Logout from './Logout';
import Private from './Private';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';
import Signup from './Signup';
import Nav from './Nav';
import Home from './Home';

import store from '../store';

injectTapEventPlugin();

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router>
        <div className="background">
          <Nav />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <PrivateRoute path="/private" component={Private} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/connections" component={Matches} />
          <PrivateRoute path="/results" component={Results} />
          <PrivateRoute path="/chats" component={Chats} />
          <PrivateRoute path="/signup" component={Signup} />
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
);

export default App;
