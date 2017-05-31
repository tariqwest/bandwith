import React from 'react';
import { Redirect, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { checkLogin } from '../actions';


const PrivateRoute = ({ component: Component, dispatch, ...rest }) => {
  const handleRender = (props) => {
    const isAuthenticated = props.isAuthenticated;

    if (isAuthenticated) {
      return <Component {...props} />;
    }

    dispatch(checkLogin());

    const to = {
      pathname: '/login',
      state: { from: props.location },
    };
    return <Redirect to={to} />;
  };

  return <Route {...rest} render={handleRender} />;
};

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

export default withRouter(connect(mapStateToProps)(PrivateRoute));
