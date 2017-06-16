import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Headset from 'material-ui/svg-icons/hardware/headset';
import Note from 'material-ui/svg-icons/image/audiotrack';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';

const style = {
  button: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { redirectURL, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return (
        <div>
          <div className="parallax-top">
            <div className="vertical-center">
              <div className="center-text">
                <span className="homepage-text opaque-background">
                  Find, Connect, and Jam with local musicians
                </span>
              </div>
            </div>
          </div>
          <Row>
            <Card style={{ boxShadow: 'none' }}>
              <Row>
                <Col xs={12} sm={6}>
                  <div className="vertical-center">
                    <div className="center-text">
                      <span className="parallel-text">Build your profile</span>
                      <span className="parallel-text">&amp;</span>
                      <span className="parallel-text">Meet like-minded</span>
                      <span className="parallel-text">musicians in your area</span>
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={6}>
                  <CardMedia className="vertical-center">
                    <img alt="splash-img" src="/assets/roman-kraft-57267.jpg" />
                  </CardMedia>
                </Col>
              </Row>
            </Card>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="parallax-bottom-loggedin">
                <div className="vertical-center">
                  <div className="center-text">
                    <span className="homepage-text opaque-background">{'Don\'t jam alone'}</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Card style={{ backgroundColor: 'black', boxShadow: 'none' }}>
                <CardText style={{ color: 'white', textAlign: 'center' }}>© 2017 Bandwith</CardText>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
    return (
      <div>
        <div className="parallax-top">
          <div className="vertical-center">
            <div className="center-text">
              <span className="homepage-text opaque-background">
                Find, Connect, and Jam with local musicians
              </span>
              <div>
                <RaisedButton
                  style={style.button}
                  label="Log in"
                  icon={<Headset />}
                  labelPosition="before"
                  href={'/login'}
                />
                <RaisedButton
                  style={style.button}
                  label="Demo"
                  icon={<Note />}
                  labelPosition="before"
                  href={'/demo'}
                  secondary
                />
              </div>
            </div>
          </div>
        </div>
        <Row>
          <Card style={{ boxShadow: 'none' }}>
            <Row>
              <Col xs={12} sm={6} className="fixed-column">
                <div className="vertical-center">
                  <div className="center-text">
                    <span className="parallel-text">Build your profile</span>
                    <span className="parallel-text">&amp;</span>
                    <span className="parallel-text">Meet like-minded</span>
                    <span className="parallel-text">musicians in your area</span>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={6} className="fixed-column">
                <CardMedia className="vertical-center">
                  <img alt="splash-img" src="/assets/roman-kraft-57267.jpg" />
                </CardMedia>
              </Col>
            </Row>
          </Card>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="parallax-bottom">
              <div className="vertical-center">
                <div className="center-text">
                  <span className="homepage-text opaque-background">{'Don\'t jam alone'}</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Card style={{ textAlign: 'center' }}>
              <List>
                <ListItem
                  disabled
                  className="homepage-text"
                  style={{ fontSize: '26px', lineHeight: '30px' }}
                  primaryText="Join the community"
                />
                <ListItem disabled>
                  <FlatButton
                    label="Sign up with Facebook"
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
                    label="Sign up with Google"
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
                    label="Sign up with Twitter"
                    icon={<img
                      style={{ width: '24px' }}
                      src="/assets/twitter-128.png"
                      alt="twitter-logo"
                    />}
                    href={`/auth/twitter/?returnTo=${redirectURL}`}
                  />
                </ListItem>
              </List>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Card style={{ backgroundColor: 'black', boxShadow: 'none' }}>
              <CardText style={{ color: 'white', textAlign: 'center' }}>© 2017 Bandwith</CardText>
            </Card>
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

export default connect(mapStateToProps)(Home);
