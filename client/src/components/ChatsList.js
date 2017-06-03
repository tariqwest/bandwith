import React from 'react';
import io from 'socket.io-client';
import ChatsListEntry from './ChatsListEntry';
import { connect } from 'react-redux';
import { sendChat, getChats } from '../actions';

class ChatsList extends React.Component {
  constructor(props) {
    super(props);
    this.handleSendClick = this.handleSendClick.bind(this);
  }

  componentDidMount(){
    const { dispatch } = this.props;
    this.socket = io('http://localhost:3000');
    this.socket.on('chat', (message) => {
      dispatch(getChats(this.props.userId, this.props.currentMatchUserId));
    });
    dispatch(getChats(this.props.userId, this.props.currentMatchUserId));
  }

  render() {
    const chatMessages = () => {
      if (this.props.currentMatchChatMessages.length > 0) {
        return (
          this.props.currentMatchChatMessages
          .map((chatMessage, i) => {
            return <ChatsListEntry key={i} chatMessage={chatMessage} />;
          })
        );
      } else {
        return (<div>No messages form this user. Start a conversation!</div>);
      }
    };

    return (
      <div>
        <div>
          <input placeholder="Enter your message..." id="message" type="text" />
          <button onClick={this.handleSendClick}>Send</button>
        </div>
        {chatMessages()}
      </div>
    );
  }

  handleSendClick(event) {
    const { dispatch } = this.props;
    const message = document.getElementById('message').value;
    this.socket.emit('chat', { userId: this.props.userId, matchUserId: this.props.currentMatchUserId, message });
    // dispatch(sendChat(this.props.userId, this.props.currentMatchUserId, message));
    dispatch(getChats(this.props.userId, this.props.currentMatchUserId));
    document.getElementById('message').value = '';
  }
}

const mapStateToProps = state => ({
  currentMatchChatMessages: state.chat.currentMatchChatMessages,
  userId: state.auth.userId,
  currentMatchUserId: state.chat.currentMatchUserId || state.auth.userId === 2 ? 1 : 2,
});

export default connect(mapStateToProps)(ChatsList);
