import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { Card,
  CardTitle,
  CardMedia,
  CardActions,
} from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import { Row, Col } from 'react-flexbox-grid';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import Signup from './Signup';

const style = {
  marginTop: 15,
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
      display,
      bio,
      age,
      gender,
      email,
      zipCode,
      searchRadius,
      instruments,
      genres,
      influences,
      preferredInstruments,
      preferredGenres,
      video_url,
      song_url,
      photo_src,
    } = this.props.user;
    const { city, state } = this.props.location;
    const fullname = `${first} ${last}`;
    const search = `Searching within ${searchRadius} miles`;
    const profile = `${gender}, ${age}`;
    const location = `${city}, ${state} ${zipCode}`;

    if (this.props.hasInfo) {
      return (
        <div>
          <Row>
            <Col xs={12} sm={8} xsOffset={0} smOffset={2}>
              <Paper style={style}>
                <Card className="chat-title">
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
                  <List>
                    <ListItem
                      leftIcon={<i className="material-icons">music_video</i>}
                      primaryText="YouTube"
                      primaryTogglesNestedList={true}
                      nestedItems={[
                        <CardMedia key={video_url}>
                          <iframe
                            frameBorder="0"
                            allowFullScreen
                            title="video"
                            src={video_url}
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
                  <List>
                    <ListItem
                      leftIcon={<i className="material-icons">speaker</i>}
                      primaryText="My Instruments"
                      primaryTogglesNestedList={true}
                      nestedItems={instruments.map(instrument =>
                        <Chip style={chipStyle}>{instrument}</Chip> // eslint-disable-line
                      )}
                    />
                    <ListItem
                      leftIcon={<i className="material-icons">album</i>}
                      primaryText="My Genres"
                      primaryTogglesNestedList={true}
                      nestedItems={genres.map(genre =>
                        <Chip style={chipStyle}>{genre}</Chip> // eslint-disable-line
                      )}
                    />
                    <ListItem
                      leftIcon={<i className="material-icons">headset</i>}
                      primaryText="My Influences"
                      primaryTogglesNestedList={true}
                      nestedItems={influences.map(influence =>
                        <Chip style={chipStyle}>{influence}</Chip> // eslint-disable-line
                      )}
                    />
                  </List>
                </Card>
              </Paper>
            </Col>
            <Col xs={12} sm={4}>
              <Paper style={style}>
                <Card>
                  <List>
                    <ListItem
                      leftIcon={<i className="material-icons">near_me</i>}
                      primaryText={search}
                    />
                    <ListItem
                      leftIcon={<i className="material-icons">grade</i>}
                      primaryText="Preferred Instruments"
                      primaryTogglesNestedList={true}
                      nestedItems={preferredInstruments.map(instrument =>
                        <Chip style={chipStyle}>{instrument}</Chip> // eslint-disable-line
                      )}
                    />
                    <ListItem
                      leftIcon={<i className="material-icons">favorite</i>}
                      primaryText="Preferred Genres"
                      primaryTogglesNestedList={true}
                      nestedItems={preferredGenres.map(genre =>
                        <Chip style={chipStyle}>{genre}</Chip> // eslint-disable-line
                      )}
                    />
                  </List>
                </Card>
              </Paper>
            </Col>
          </Row>
          <Row>
            <Col>
              <Paper style={style}>
                <Card>
                  <CardActions>
                    <FlatButton
                      label="Edit"
                      onClick={() => this.setState({ showEditProfile: true })}
                    />
                  </CardActions>
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
