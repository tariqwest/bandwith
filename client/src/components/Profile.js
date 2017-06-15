/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { Card,
  CardHeader,
  CardTitle,
  CardMedia,
} from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import { Row, Col } from 'react-flexbox-grid';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import IconButton from 'material-ui/IconButton';
import LoadingSpinner from './LoadingSpinner';
import Signup from './Signup';

const styles = {
  pageContainer: {
    // left and right margins
    // top and bottom padding if necesarry around multiple cards
    paddingTop: '0px',
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  cardContainer: {
    // spacing between cards on a page
    marginTop: '12px',
    marginBottom: '12px',
  },
  loadingSpinner: {
    textAlign: 'center',
    width: '100%',
  },
  chip: {
    marginTop: 5,
    marginLeft: 5,
    display: 'inline-block',
  },
  columnLeft: { paddingRight: 5 },
  columnRight: { paddingLeft: 5 },
  rowFixTop: { marginTop: 0 },
  rowFixBottom: { marginBottom: 0 },
  listItem: {
    paddingRight: 12,
    paddingLeft: 12,
  },
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditProfile: false,
      youTubeIsLoading: false,
      soundCloudIsLoading: false,
    };
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

    const { hasUserInfo, isSavingUser, isFetchingUser } = this.props;
    const { location } = this.props.location;
    const fullname = `${first} ${last}`;
    const search = `Searching within ${search_radius} miles`;
    const profile = `${gender}, ${age}`;

    if (hasUserInfo && !isSavingUser && !isFetchingUser) {
      let videoId = '';
      if (video_url) {
        const videoUrl = video_url.split('/');
        const videoQuery = videoUrl[videoUrl.length - 1].split('=');
        videoId = videoQuery[videoQuery.length - 1];
      }

      const re = new RegExp(/\d+(?=&)/g);
      const song_id = song_url && song_url.match(re);

      return (
        <div style={styles.pageContainer}>
          <div className="bump-tab-bar" />
          <Row>
            <Col xs={12} sm={8} smOffset={2}>
              <Paper style={styles.cardContainer}>
                <Card className="chat-title">
                  <div className="edit-div">
                    <IconButton
                      className="edit-button"
                      onClick={() => this.setState({ showEditProfile: true })}
                    >
                      <i className="material-icons">create</i>
                    </IconButton>
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
            <Col xs={12} sm={8} smOffset={2}>
              <Paper style={Object.assign({}, styles.cardContainer, styles.rowFixTop, styles.rowFixBottom)}>
                <Card>
                  <CardMedia>
                    <iframe
                      scrolling="no"
                      frameBorder="no"
                      title="audio"
                      src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${song_id}`}
                    />
                  </CardMedia>
                </Card>
              </Paper>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={4} smOffset={2} style={styles.columnLeft}>
              <Paper style={styles.cardContainer}>
                <Card>
                  <CardTitle title="General Info" />
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
              <Paper style={Object.assign({}, styles.cardContainer, styles.rowFixBottom)}>
                <Card>
                  <CardTitle title="Talents &amp; Influences" />
                  <List>
                    <ListItem
                      autoGenerateNestedIndicator={false}
                      initiallyOpen
                      disabled
                      leftIcon={<i className="material-icons">speaker</i>}
                      primaryText="My Instruments"
                      nestedListStyle={styles.listItem}
                      nestedItems={instruments.map(instrument =>
                        <Chip key={instrument} style={styles.chip}>{instrument}</Chip> // eslint-disable-line
                      )}
                    />
                    <ListItem
                      autoGenerateNestedIndicator={false}
                      initiallyOpen
                      disabled
                      leftIcon={<i className="material-icons">album</i>}
                      primaryText="My Genres"
                      nestedListStyle={styles.listItem}
                      nestedItems={genres.map(genre =>
                        <Chip key={genre} style={styles.chip}>{genre}</Chip> // eslint-disable-line
                      )}
                    />
                    <ListItem
                      autoGenerateNestedIndicator={false}
                      initiallyOpen
                      disabled
                      leftIcon={<i className="material-icons">headset</i>}
                      primaryText="My Influences"
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
            <Col xs={12} sm={4} style={styles.columnRight}>
              <Paper style={Object.assign({}, styles.cardContainer, styles.rowFixBottom)}>
                <Card>
                  <CardMedia key={videoId}>
                    <div className="aspect-ratio">
                      <iframe
                        frameBorder="0"
                        allowFullScreen
                        title="video"
                        src={`https://www.youtube.com/embed/${videoId}`}
                      />
                    </div>
                  </CardMedia>
                </Card>
              </Paper>
              <Paper style={styles.cardContainer}>
                <Card>
                  <CardTitle title="Musical Preferences" />
                  <List>
                    <ListItem
                      disabled
                      leftIcon={<i className="material-icons">near_me</i>}
                      primaryText={search}
                    />
                    <ListItem
                      autoGenerateNestedIndicator={false}
                      initiallyOpen
                      disabled
                      leftIcon={<i className="material-icons">grade</i>}
                      primaryText="Preferred Instruments"
                      nestedListStyle={styles.listItem}
                      nestedItems={preferred_instruments.map(instrument =>
                        <Chip key={instrument} style={styles.chip}>{instrument}</Chip> // eslint-disable-line
                      )}
                    />
                    <ListItem
                      autoGenerateNestedIndicator={false}
                      initiallyOpen
                      disabled
                      leftIcon={<i className="material-icons">favorite</i>}
                      primaryText="Preferred Genres"
                      nestedListStyle={styles.listItem}
                      nestedItems={preferred_genres.map(genre =>
                        <Chip key={genre} style={styles.chip}>{genre}</Chip> // eslint-disable-line
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
      <div style={styles.pageContainer}>
        <div className="bump-tab-bar" />
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
              <div style={styles.loadingSpinner}>
                <LoadingSpinner />
              </div>
          </Col>
        </Row>
      </div>
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
