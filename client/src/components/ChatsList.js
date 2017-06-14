import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { CardText, CardActions } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { List } from 'material-ui/List';
import ChatsListEntry from './ChatsListEntry';
import LoadingSpinner from './LoadingSpinner';
import { getChats, addSentChat, addReceivedChat } from '../actions';

const styles = {
  paper: { margin: 10 },
  title: { textAlign: 'center' },
};

class ChatsList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getChats(this.props.userId, this.props.currentMatchUserId));
  }

  render() {
    const chatMessages = () => {
      if (this.props.isFetching) {
        return (
          <div>
            <div className="bump-tab-bar" />
            <Row>
              <Col xs={12} sm={6} smOffset={3}>
                <Paper style={styles.paper} zDepth={1}>
                  <div style={styles.title}>
                    <LoadingSpinner />
                  </div>
                </Paper>
              </Col>
            </Row>
          </div>
        );
      }
      if (this.props.currentMatchChatMessages.length > 0) {
        return (
          this.props.currentMatchChatMessages
          .map(chatMessage => (
            <ChatsListEntry
              key={chatMessage.id}
              chatMessage={chatMessage}
              currentMatch={this.props.currentMatch}
            />
          ))
        );
      }
      return (<CardText>Start a conversation!</CardText>);
    };

    return (
      <div>
        <List>
          {chatMessages()}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentMatchChatMessages: state.chat.currentMatchChatMessages,
  userId: state.auth.userId,
  currentMatchUserId: state.chat.currentMatchUserId,
  isFetching: state.chat.isFetching,
});

export default connect(mapStateToProps)(ChatsList);
