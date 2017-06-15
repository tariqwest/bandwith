/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import { Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import TagList from './TagList';
import ResultsProfile from './ResultsProfile';
import { sendResultsAction } from '../actions';

const styles = {
  fullProfile: {
    choiceBar: {
      zIndex: 100,
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
      bottom: 0,
      background: '#000',
      paddingTop: 5,
      paddingBottom: 5,
    },
    choiceButton: {
      color: '#fff',
    },
    containerStyle: {
      paddingBottom: '50px',
    },
  },
  generalInfo: {
    height: '30px',
    display: 'inline-flex',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  generalInfoIcon: {
    marginTop: '-2px',
    marginRight: '5px',
  },
};

class ResultsListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullProfile: false,
    };

    this.handleChoice = this.handleChoice.bind(this);
  }

  handleChoice(choice) {
    const { dispatch, userId, result } = this.props;
    dispatch(sendResultsAction(choice, userId, result.id));
  }

  render() {
    const {
      first,
      last,
      bio,
      photo_src_small,
      instruments,
      genres,
      gender,
      age,
      location,
    } = this.props.result;
    const fullname = `${first} ${last}`;
    const profile = `${gender}, ${age}`;

    return (
      <div>
        <Card>
          <CardText className="chat-title clickable" onClick={() => this.setState({ showFullProfile: true })} >
            <img className="chat-picture" width="100" height="100" alt="profile-pic" src={photo_src_small || '/assets/avatar.jpg'} />
            <CardTitle title={`${first} ${last}`} subtitle={bio} />
            <CardText>
              <span style={styles.generalInfo}><i className="material-icons" style={styles.generalInfoIcon}>account_circle</i>{profile}</span>
              <span style={styles.generalInfo}><i className="material-icons" style={styles.generalInfoIcon}>place</i>{location}</span>
            </CardText>
            <CardText> <TagList tags={instruments.concat(genres)} type="instrument" /> </CardText>
          </CardText>

          <Divider />
          <CardActions>
            <Row>
              <Col xs={6}>
                <FlatButton fullWidth label="Yes" onClick={() => this.handleChoice(true)} />
              </Col>
              <Col xs={6}>
                <FlatButton fullWidth label="No" onClick={() => this.handleChoice(true)} />
              </Col>
            </Row>
          </CardActions>
        </Card>
        <FullscreenDialog
          open={this.state.showFullProfile}
          onRequestClose={() => this.setState({ showFullProfile: false })}
          title={fullname}
          actionButton={<FlatButton
            label="Close"
            onTouchTap={() => this.setState({ showFullProfile: false })}
          />}
          appBarStyle={{ backgroundColor: '#000000' }}
          containerStyle={styles.fullProfile.containerStyle}
        >
          <Card style={styles.fullProfile.choiceBar}>
            <CardActions>
              <Row>
                <Col xs={6}>
                  <FlatButton
                    fullWidth
                    style={styles.fullProfile.choiceButton}
                    label="Yes"
                    onClick={() => this.handleChoice(true)}
                  />
                </Col>
                <Col xs={6}>
                  <FlatButton
                    fullWidth
                    style={styles.fullProfile.choiceButton}
                    label="No"
                    onClick={() => this.handleChoice(true)}
                  />
                </Col>
              </Row>
            </CardActions>
          </Card>
          <Row>
            <Col xs={12} sm={8} smOffset={2}>
              <ResultsProfile currentResult={this.props.result} />
            </Col>
          </Row>
        </FullscreenDialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  user: state.user.profile,
});

export default connect(mapStateToProps)(ResultsListEntry);
