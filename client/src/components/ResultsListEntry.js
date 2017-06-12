import React from 'react';
import TagList from './TagList';
import { sendResultsAction } from '../actions';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import ResultsProfile from './ResultsProfile';
import { Row, Col } from 'react-flexbox-grid';

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
      display,
      bio,
      photo_src_small,
      instruments,
      genres,
    } = this.props.result;
    const fullname = `${first} ${last}`;

    return (
      <div>
        <Card>
          <CardText onClick={() => this.setState({ showFullProfile: true })} >
            <div className="chat-title">
              <img className="chat-picture" width="100" height="100" alt="profile-pic" src={photo_src_small || '/assets/avatar.jpg'} />
              <CardTitle title={`${first} ${last}`} subtitle={bio} />
            </div>
            <CardText> <TagList tags={instruments.concat(genres)} type="instrument" /> </CardText>
          </CardText>

          <Divider />
          <CardActions>
            <Row>
              <Col xs={6}>
                <FlatButton fullWidth={true} label="Yes" onClick={() => this.handleChoice(true)} />
              </Col>
              <Col xs={6}>
                <FlatButton fullWidth={true} label="No" onClick={() => this.handleChoice(true)} />
              </Col>
            </Row>
          </CardActions>
        </Card>
        <FullscreenDialog
          open={this.state.showFullProfile}
          onRequestClose={() => this.setState({ showFullProfile: false })}
          title={fullname}
          actionButton={<FlatButton
            label='Close'
            onTouchTap={() => this.setState({ showFullProfile: false })}
          />}
          appBarStyle={{backgroundColor: '#000000'}}
          containerStyle={styles.fullProfile.containerStyle}
        >
          <Card style={styles.fullProfile.choiceBar}>
            <CardActions>
              <Row>
                <Col xs={6}>
                  <FlatButton style={styles.fullProfile.choiceButton} fullWidth={true} label="Yes" onClick={() => this.handleChoice(true)} />
                </Col>
                <Col xs={6}>
                  <FlatButton style={styles.fullProfile.choiceButton} fullWidth={true} label="No" onClick={() => this.handleChoice(true)} />
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
