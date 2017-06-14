import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { CardText, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { List } from 'material-ui/List';
import ChatsListEntry from './ChatsListEntry';
import { getChats, addSentChat, addReceivedChat } from '../actions';

const styles = {

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
});

export default connect(mapStateToProps)(ChatsList);
