import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Demo extends Component {
  componentDidMount() {
    const { history } = this.props;
    const user = { email: 'john@lennon.com', password: 'admin123' };

    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    };

    fetch('/auth/login', options).then((res) => {
      if (res.ok) {
        console.log('Good Job');
      }
      return res;
    }).then((res) => {
        history.push('/');
      })
  }

  render() {
    return <div className="">Loading </div>;
  }
}

export default withRouter(Demo);