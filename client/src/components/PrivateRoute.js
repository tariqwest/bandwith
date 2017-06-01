import React from 'react';
import { Redirect, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { checkLogin, setRedirectUrl } from '../actions';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.handleRender = this.handleRender.bind(this);
  }

  componentWillMount() {
    const { dispatch, location, isAuthenticated } = this.props;
    const redirect = location.pathname;

    if (!isAuthenticated) {
      dispatch(setRedirectUrl(redirect));
      dispatch(checkLogin());
    }
  }

  handleRender() {
    const { isAuthenticated, location, component: Component } = this.props;

    if (isAuthenticated) {
      return <Component {...this.props} />;
    }

    const to = {
      pathname: '/login',
      state: { from: location },
    };
    return <Redirect to={to} />;
  }

  render() {
    const { component, ...rest } = this.props;
    return <Route {...rest} render={this.handleRender} />;
  }

}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

export default withRouter(connect(mapStateToProps)(PrivateRoute));
