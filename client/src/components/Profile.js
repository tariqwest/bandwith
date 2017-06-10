import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { Card,
  CardTitle,
  CardMedia,
} from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import { Row, Col } from 'react-flexbox-grid';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
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
  }

  render() {
    const {
      first,
      last,
      bio,
      age,
      gender,
      email,
      zipcode,
      search_radius,
      instruments,
      genres,
      influences,
      preferred_instruments,
      preferred_genres,
      video_url,
      song_url,
      photo_src,
    } = this.props.user;
    const { city, state } = this.props.location;
    const fullname = `${first} ${last}`;
    const search = `Searching within ${search_radius} miles`;
    const profile = `${gender}, ${age}`;
    const location = `${city}, ${state} ${zipcode}`;

    if (this.props.hasInfo) {
      let videoId = '';
      if (video_url) {
        const videoUrl = video_url.split('/');
        const videoQuery = videoUrl[videoUrl.length - 1].split('=');
        videoId = videoQuery[videoQuery.length - 1];
      }

      return (
        <div>
          <Row>
            <Col xs={12} sm={8} xsOffset={0} smOffset={2}>
              <Paper style={style}>
                <Card className="chat-title">
                  <div className="edit-div">
                    <FloatingActionButton
                      className="edit-button"
                      onClick={() => this.setState({ showEditProfile: true })}
                      mini={true}
                      backgroundColor="black"
                      children={<i className="material-icons">create</i>}
                    />
                  </div>
                  <img
                    className="chat-picture"
                    width="100"
                    height="100"
                    alt="profile-pic"
                    src={photo_src}
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
                      leftIcon={<i className="material-icons">account_circle</i>}
                      primaryText={profile}
                    />
                    <ListItem
                      leftIcon={<i className="material-icons">email</i>}
                      primaryText={email}
                    />
                    <ListItem
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
                      primaryTogglesNestedList={true}
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
                      primaryTogglesNestedList={true}
                      nestedItems={[
                        <CardMedia key={song_url}>
                          <iframe
                            scrolling="no"
                            frameBorder="no"
                            title="audio"
                            src={song_url}
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
                      primaryTogglesNestedList={true}
                      nestedItems={instruments.map(instrument =>
                        <Chip key={instrument} style={chipStyle}>{instrument}</Chip> // eslint-disable-line
                      )}
                    />
                    <ListItem
                      leftIcon={<i className="material-icons">album</i>}
                      primaryText="My Genres"
                      primaryTogglesNestedList={true}
                      nestedItems={genres.map(genre =>
                        <Chip key={genre} style={chipStyle}>{genre}</Chip> // eslint-disable-line
                      )}
                    />
                    <ListItem
                      leftIcon={<i className="material-icons">headset</i>}
                      primaryText="My Influences"
                      primaryTogglesNestedList={true}
                      nestedItems={influences.map(influence =>
                        <Chip key={influence.name} style={chipStyle}>{influence.name}</Chip> // eslint-disable-line
                      )}
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
                      primaryTogglesNestedList={true}
                      nestedItems={preferred_instruments.map(instrument =>
                        <Chip key={instrument} style={chipStyle}>{instrument}</Chip> // eslint-disable-line
                      )}
                    />
                    <ListItem
                      leftIcon={<i className="material-icons">favorite</i>}
                      primaryText="Preferred Genres"
                      primaryTogglesNestedList={true}
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
            title={this.props.user.display}
            actionButton={<FlatButton
              label="Close"
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
      <div>Loading</div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.profile,
  hasInfo: state.user.hasInfo,
  location: state.location,
});

export default connect(mapStateToProps)(Profile);
