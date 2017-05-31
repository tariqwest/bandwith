import React from 'react';

const Login = () => (
  <div className="col-sm-6 col-sm-offset-3">
    <h1><span className="fa fa-sign-in">?</span> Login</h1>
    {/* <div className="alert alert-danger">CONDITIONAL MESSAGE</div> */}

    <form action="/login" method="post">
      <div className="form-group">
        <label>Email</label>
        <input type="text" className="form-control" name="email" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" name="password" />
      </div>

      <button type="submit" className="btn btn-warning btn-lg">Login</button>
    </form>

    <hr />
    <div>
      Or login with any of the following services:<br />
      <a style={{ marginRight: '15px' }} href="/auth/facebook">
        <img src="/assets/fb-logo.png" alt="facebook-logo" />
      </a>
      <a style={{ marginLeft: '15px', marginRight: '15px' }} href="/auth/google">
        <img style={{ width: '29px' }} src="/assets/google-logo.png" alt="google-logo" />
      </a>
      <a style={{ marginLeft: '15px' }} href="/auth/twitter">
        <img style={{ width: '48px' }} src="/assets/twitter-logo.png" alt="twitter-logo" />
      </a>
    </div>
    <hr />

    <p>Need to sign up for an account? <a href="/signup">Signup</a></p>
    <p><a href="/">home</a></p>

  </div>
);

// Login.propTypes = {
//   : React.PropTypes.
// };

export default Login;
