import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText, CardMedia, CardHeader, CardActions } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import ChatsList from './ChatsList';
import ResultsProfile from './ResultsProfile';
import Paper from 'material-ui/Paper';
import ResultsListEntry from './ResultsListEntry';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  paper: { margin: 10 },
  profileContainer: { padding: 10 },
  title: { textAlign: 'center' },
};

class Chats extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showProfile: false,
      showChat: true,
    };
    this.toggleChatAndProfile = this.toggleChatAndProfile.bind(this);
  }

  toggleChatAndProfile = (show) => {
    if(show === 'chat'){
      this.setState({showChat: true, showProfile: false});
    }else{
      this.setState({showProfile: true, showChat: false});
    }
  };

  render() {
    const currentMatch = this.props.matches.filter((match) => match.id === this.props.currentMatchUserId)[0];
    const {
      first,
      last,
      bio,
      photo_src
    } = currentMatch;

    const chatOrProfile = () => {
      if(this.state.showChat){
        return (<Paper style={styles.paper} ><Card><ChatsList currentMatch={currentMatch} /></Card></Paper>)
      }else{
        return (<div style={styles.profileContainer}><ResultsProfile currentMatch={currentMatch} /></div>)
      }
    }

    return (
      <Row>
        <Col xs={12} sm={8} smOffset={2}>
          <Paper style={styles.paper}>
          <Card>
            <div className="chat-title">
              <img className="chat-picture" width="100" height="100" alt="profile-pic" src={photo_src || '/assets/avatar.jpg'} />
              <CardTitle
                title={`${first} ${last}`} subtitle={bio}
              />
              <Divider />
            <CardActions>
              <Row>
                <Col xs={6}>
                  <FlatButton fullWidth={true} label="Chat" onClick={() => this.toggleChatAndProfile('chat')} />
                </Col>
                <Col xs={6}>
                  <FlatButton fullWidth={true} label="Profile" onClick={() => this.toggleChatAndProfile('profile')} />
                </Col>
              </Row>
            </CardActions>
            </div>
          </Card>
          </Paper>
            {chatOrProfile()}
        </Col>
      </Row>
    );
  }

}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  currentMatchUserId: state.chat.currentMatchUserId,
  matches: state.matches.matches,
});

export default connect(mapStateToProps)(Chats);
