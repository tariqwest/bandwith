import React from 'react';
import { Redirect, Route } from 'react-router';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const handleRender = (props) => {
    const isAuthenticated = false;

    if (isAuthenticated) {
      return <Component {...props} />;
    }

    const to = {
      pathname: '/login',
      state: { from: props.location },
    };

    return <Redirect to={to} />;
  };

  return <Route {...rest} render={handleRender} />;
};

export default PrivateRoute;
