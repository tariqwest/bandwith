import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { checkLogin } from '../actions';

class Demo extends Component {
  componentDidMount() {
    const { history, dispatch } = this.props;

    fetch('/auth/login', {
      method: 'POST',
      body: 'email=john@lennon.com&password=admin123&returnTo=/connections',
      headers: {
        Accept: 'text/html, application/xhtml+xml,application/xml;q=0.9, image/webp,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include',
    }).then(() => { 
      dispatch(checkLogin());
      history.push('/connections');
    });
  }

  render() {
    return <div>Loading... </div>;
  }
}

export default withRouter(connect()(Demo));