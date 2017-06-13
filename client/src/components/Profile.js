/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import {
  Card,
  CardHeader,
  CardTitle,
  CardMedia,
} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Signup from './Signup';

const style = {
  marginTop: 8,
  marginBottom: 8,
};
const chipStyle = {
  marginTop: 5,
  marginLeft: 5,
  display: 'inline-block',
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showEditProfile: false };
    this.checkFormRedirect = this.checkFormRedirect.bind(this);
  }

  componentWillMount() {
    this.checkFormRedirect(this.props);
  }

  componentWillReceiveProps(next) {
    this.checkFormRedirect(next);
  }

  checkFormRedirect(props) {
    const { hasProfile, hasUserInfo, isSavingUser } = props;

    if (hasUserInfo && !hasProfile && !isSavingUser) {
      this.setState({ showEditProfile: true });
    }
    if (hasUserInfo && hasProfile) {
      this.setState({ showEditProfile: false });
    }
  }

  render() {
    const {
      first,
      last,
      bio,
      age,
      gender,
      email,
      search_radius,
      instruments,
      genres,
      influences,
      preferred_instruments,
      preferred_genres,
      video_url,
      song_url,
      photo_src_small,
    } = this.props.user;

    const { hasUserInfo } = this.props;
    const { location } = this.props.location;
    const fullname = `${first} ${last}`;
    const search = `Searching within ${search_radius} miles`;
    const profile = `${gender}, ${age}`;


    if (hasUserInfo) {
      let videoId = '';
      if (video_url) {
        const videoUrl = video_url.split('/');
        const videoQuery = videoUrl[videoUrl.length - 1].split('=');
        videoId = videoQuery[videoQuery.length - 1];
      }

      const re = new RegExp(/\d+(?=&)/g);
      const song_id = song_url && song_url.match(re);

      return (
        <div>
          <div className="bump-tab-bar" />
          <Row>
            <Col xs={12} sm={8} xsOffset={0} smOffset={2}>
              <Paper style={style}>
                <Card className="chat-title">
                  <div className="edit-div">
                    <FloatingActionButton
                      zDepth={1}
                      className="edit-button"
                      onClick={() => this.setState({ showEditProfile: true })}
                      mini
                      backgroundColor="white"
                      iconStyle={{ color: 'black' }}
                    >
                      <i className="material-icons">create</i>
                    </FloatingActionButton>
                  </div>
                  <img
                    className="chat-picture"
                    width="100"
                    height="100"
                    alt="profile-pic"
                    id="profile-pic"
                    src={photo_src_small || '/assets/avatar.jpg'}
                  />
                  <CardTitle title={fullname} subtitle={bio} />
                </Card>
              </Paper>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={4} smOffset={2}>
              <Paper style={style}>
                <Card>
                  <CardTitle title="Personal Info" />
                  <List>
                    <ListItem
                      disabled
                      leftIcon={<i className="material-icons">account_circle</i>}
                      primaryText={profile}
                    />
                    <ListItem
                      disabled
                      leftIcon={<i className="material-icons">email</i>}
                      primaryText={email}
                    />
                    <ListItem
                      disabled
                      leftIcon={<i className="material-icons">place</i>}
                      primaryText={location}
                    />
                  </List>
                </Card>
              </Paper>
            </Col>
            <Col xs={12} sm={4}>
              <Paper style={style}>
                <Card>
                  <CardTitle title="Checkout my skills..." />
                  <List>
                    <ListItem
                      leftIcon={<i className="material-icons">music_video</i>}
                      primaryText="YouTube"
                      primaryTogglesNestedList
                      nestedItems={[
                        <CardMedia key={videoId}>
                          <iframe
                            frameBorder="0"
                            allowFullScreen
                            title="video"
                            src={`https://www.youtube.com/embed/${videoId}`}
                          />
                        </CardMedia>,
                      ]}
                    />
                    <ListItem
                      leftIcon={<i className="material-icons">audiotrack</i>}
                      primaryText="SoundCloud"
                      primaryTogglesNestedList
                      nestedItems={[
                        <CardMedia key={song_id}>
                          <iframe
                            scrolling="no"
                            frameBorder="no"
                            title="audio"
                            src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${song_id}`}
                          />
                        </CardMedia>,
                      ]}
                    />
                  </List>
                </Card>
              </Paper>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={4} smOffset={2}>
              <Paper style={style}>
                <Card>
                  <CardTitle title="Me as a Musician" />
                  <List>
                    <ListItem
                      leftIcon={<i className="material-icons">speaker</i>}
                      primaryText="My Instruments"
                      primaryTogglesNestedList
                      nestedItems={instruments.map(instrument =>
                        <Chip key={instrument} style={chipStyle}>{instrument}</Chip> // eslint-disable-line
                      )}
                    />
                    <ListItem
                      leftIcon={<i className="material-icons">album</i>}
                      primaryText="My Genres"
                      primaryTogglesNestedList
                      nestedItems={genres.map(genre =>
                        <Chip key={genre} style={chipStyle}>{genre}</Chip> // eslint-disable-line
                      )}
                    />
                    <ListItem
                      leftIcon={<i className="material-icons">headset</i>}
                      primaryText="My Influences"
                      primaryTogglesNestedList
                      nestedItems={influences.map(influence => (
                        <Card key={influence.name}>
                          <CardHeader title={influence.name} avatar={influence.img} />
                        </Card> // eslint-disable-line
                      ))}
                    />
                  </List>
                </Card>
              </Paper>
            </Col>
            <Col xs={12} sm={4}>
              <Paper style={style}>
                <Card>
                  <CardTitle title="I am looking for Musicians..." />
                  <List>
                    <ListItem
                      leftIcon={<i className="material-icons">near_me</i>}
                      primaryText={search}
                    />
                    <ListItem
                      leftIcon={<i className="material-icons">grade</i>}
                      primaryText="Preferred Instruments"
                      primaryTogglesNestedList
                      nestedItems={preferred_instruments.map(instrument =>
                        <Chip key={instrument} style={chipStyle}>{instrument}</Chip> // eslint-disable-line
                      )}
                    />
                    <ListItem
                      leftIcon={<i className="material-icons">favorite</i>}
                      primaryText="Preferred Genres"
                      primaryTogglesNestedList
                      nestedItems={preferred_genres.map(genre =>
                        <Chip key={genre} style={chipStyle}>{genre}</Chip> // eslint-disable-line
                      )}
                    />
                  </List>
                </Card>
              </Paper>
            </Col>
          </Row>

          <FullscreenDialog
            open={this.state.showEditProfile}
            onRequestClose={() => this.setState({ showEditProfile: false })}
            title={fullname}
            actionButton={<FlatButton
              label="Save"
              onTouchTap={() => this.setState({ showEditProfile: false })}
            />}
            appBarStyle={{ backgroundColor: '#000000' }}
          >
            <Signup />
          </FullscreenDialog>
        </div>
      );
    }
    return (
      <CircularProgress size={100} thickness={5} />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.profile,
  location: state.location,
  hasProfile: state.user.profile.has_profile,
  hasUserInfo: state.user.hasInfo,
  isFetchingUser: state.user.isFetching,
  isSavingUser: state.signup.isFetching,
});

export default connect(mapStateToProps)(Profile);
