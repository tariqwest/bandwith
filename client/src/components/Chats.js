import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText, CardMedia, CardHeader, CardActions } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import ChatsList from './ChatsList';
import ChatsInput from './ChatsInput';
import ResultsProfile from './ResultsProfile';
import Paper from 'material-ui/Paper';
import ResultsListEntry from './ResultsListEntry';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  paper: { margin: 10 },
  profileContainer: { padding: 10 },
  title: { textAlign: 'center' },
  chatsProfileHeader: {
    position: 'absolute',
    top: 65,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  chatsContainer: {
    width: '100%',
    paddingBottom: '50px',
    paddingTop: '275px',
  },
  chatsListContainer: {
    zIndex: '-1',
    position: 'absolute',
  },
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
      photo_src_small
    } = currentMatch;

    const chatOrProfile = () => {
      if(this.state.showChat){
        return (<div style={styles.chatsContainer}><ChatsInput /><Paper style={styles.paper} ><Card><ChatsList style={styles.chatsListContainer} currentMatch={currentMatch} /></Card></Paper></div>)
      }else{
        return (<div style={styles.profileContainer}><ResultsProfile currentMatch={currentMatch} /></div>)
      }
    }

    return (
      <div>

            <Paper style={styles.paper}>
            <Card style={styles.chatsProfileHeader}>
              <div className="chat-title">
                <img className="chat-picture" width="100" height="100" alt="profile-pic" src={photo_src_small || '/assets/avatar.jpg'} />
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
      </div>
    );
  }

}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  currentMatchUserId: state.chat.currentMatchUserId,
  matches: state.matches.matches,
});

export default connect(mapStateToProps)(Chats);
