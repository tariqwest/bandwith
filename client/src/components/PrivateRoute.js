import React from 'react';
import { Redirect, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { checkLogin, setRedirectUrl, getUserInfo } from '../actions';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.handleRender = this.handleRender.bind(this);
  }

  componentWillMount() {
    const {
      dispatch,
      location,
      isAuthenticated,
      isFetchingAuth,
    } = this.props;

    let redirect = location.pathname;
    if (redirect === '/logout' || redirect === '/login') {
      redirect = '/results';
    }

    if (!isAuthenticated && !isFetchingAuth) {
      dispatch(setRedirectUrl(redirect));
      dispatch(checkLogin());
    }

    this.getUserInfoIfReady();
  }

  componentDidUpdate() {
    this.getUserInfoIfReady();
  }

  getUserInfoIfReady() {
    const { dispatch, hasUserInfo, isAuthenticated, userId, isFetchingUser } = this.props;
    if (isAuthenticated && !hasUserInfo && !isFetchingUser) {
      dispatch(getUserInfo(userId));
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isFetchingAuth: state.auth.isFetching,
  userId: state.auth.userId,
  isFetchingUser: state.user.isFetching,
  hasUserInfo: state.user.hasInfo,
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
