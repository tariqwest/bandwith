import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 30,
};


class Login extends React.Component {
  componentDidMount() {
    this.checkAuth();
  }

  componentDidUpdate() {
    this.checkAuth();
  }

  checkAuth() {
    const { isAuthenticated, history, redirectURL } = this.props;
    if (isAuthenticated) { history.push(redirectURL); }
  }

  render() {
    const { redirectURL } = this.props;

    return (
      <div>
        <div className="bump-tab-bar" />
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <Paper style={style} zDepth={1}>
              <Card>
                <List>
                  <ListItem
                    disabled
                    className="homepage-text"
                    style={{ fontSize: '26px' }}
                    primaryText="Join Us!"
                  />
                  <ListItem disabled>
                    <FlatButton
                      label="Log in with Facebook"
                      icon={<img
                        style={{ width: '24px' }}
                        src="/assets/fb-art.png"
                        alt="facebook-logo"
                      />}
                      href={`/auth/facebook/?returnTo=${redirectURL}`}
                    />
                  </ListItem>
                  <ListItem disabled>
                    <FlatButton
                      label="Log in with Google"
                      icon={<img
                        style={{ width: '24px' }}
                        src="/assets/google_logo_transparent.png"
                        alt="google-logo"
                      />}
                      href={`/auth/google/?returnTo=${redirectURL}`}
                    />
                  </ListItem>
                  <ListItem disabled>
                    <FlatButton
                      label="Log in with Twitter"
                      icon={<img
                        style={{ width: '24px' }}
                        src="/assets/twitter-128.png"
                        alt="twitter-logo"
                      />}
                      href={`/auth/twitter/?returnTo=${redirectURL}`}
                    />
                  </ListItem>
                </List>
                <ListItem>
                  <RaisedButton label="Return to Home Page" containerElement={<Link to="/" />} />
                </ListItem>
              </Card>
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  redirectURL: state.redirectURL,
  isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(Login));
