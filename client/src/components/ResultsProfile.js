/* eslint-disable camelcase */
import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {
  Card,
  CardHeader,
  CardTitle,
  CardMedia,
} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';

const styles = {
  pageContainer: {
    // left and right margins
    // top and bottom padding if necesarry around multiple cards
    paddingTop: '0px',
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  bottomRow: { marginBottom: 20 },
  cardContainer: {
    // spacing between cards on a page
    marginTop: 12,
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

class ResultsProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      first,
      last,
      bio,
      age,
      gender,
      location,
      instruments,
      genres,
      influences,
      preferredInstruments,
      preferredGenres,
      video_url,
      song_url,
      photo_src_small,
    } = this.props.currentResult || this.props.currentMatch;
    const fullname = `${first} ${last}`;
    const profile = `${gender}, ${age}`;

    if (this.props.currentResult || this.props.currentMatch) {
      let videoId = '';
      if (video_url) {
        const videoUrl = video_url.split('/');
        const videoQuery = videoUrl[videoUrl.length - 1].split('=');
        videoId = videoQuery[videoQuery.length - 1];
      }

      const re = new RegExp(/\d+(?=&)/g);
      const song_id = song_url && song_url.match(re);

      const profileHeader = () => {
        if (this.props.currentResult) {
          return (
            <Row>
              <Col xs={12}>
                <Paper style={styles.cardContainer}>
                  <Card className="chat-title">
                    <img
                      className="chat-picture"
                      width="100"
                      height="100"
                      alt="profile-pic"
                      src={photo_src_small || '/assets/avatar.jpg'}
                    />
                    <CardTitle title={fullname} subtitle={bio} />
                  </Card>
                </Paper>
              </Col>
            </Row>);
        }
        return (<div style={{ height: '265px' }} />);
      };

      return (
        <div style={styles.pageContainer}>
          {profileHeader()}
          <Row>
            <Col xs={12} sm={12}>
              <Paper style={Object.assign({}, styles.cardContainer, styles.rowFixBottom)}>
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
          <Row style={styles.bottomRow}>
            <Col xs={12} sm={6} style={styles.columnLeft}>
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
                      leftIcon={<i className="material-icons">place</i>}
                      primaryText={location}
                    />
                  </List>
                </Card>
              </Paper>
              <Paper style={styles.cardContainer}>
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
                          <CardHeader
                            title={influence.influence_name}
                            avatar={influence.influence_img}
                          />
                        </Card> // eslint-disable-line
                      ))}
                    />
                  </List>
                </Card>
              </Paper>
            </Col>
            <Col xs={12} sm={6} style={styles.columnRight}>
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
                      autoGenerateNestedIndicator={false}
                      initiallyOpen
                      disabled
                      leftIcon={<i className="material-icons">grade</i>}
                      primaryText="Preferred Instruments"
                      nestedListStyle={styles.listItem}
                      nestedItems={preferredInstruments.map(instrument =>
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
                      nestedItems={preferredGenres.map(genre =>
                        <Chip key={genre} style={styles.chip}>{genre}</Chip> // eslint-disable-line
                      )}
                    />
                  </List>
                </Card>
              </Paper>
            </Col>
          </Row>
        </div>
      );
    }
    return (<div />);
  }
}

export default ResultsProfile;
