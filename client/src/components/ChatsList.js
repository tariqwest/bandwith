import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { List } from 'material-ui/List';
import ChatsListEntry from './ChatsListEntry';
import { getChats } from '../actions';

class ChatsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
    this.handleSendClick = this.handleSendClick.bind(this);
    this.saveMessage = this.saveMessage.bind(this);
  }

  componentDidMount(){
    const { dispatch } = this.props;
    this.socket = io('http://localhost:3000');
    this.socket.on('chat', () => {
      dispatch(getChats(this.props.userId, this.props.currentMatchUserId));
    });
    dispatch(getChats(this.props.userId, this.props.currentMatchUserId));
  }

  saveMessage(event) {
    this.setState({
      message: event.target.value,
    });
  }

  handleSendClick() {
    const { dispatch } = this.props;
    const message = this.state.message;
    this.socket.emit('chat', { userId: this.props.userId, matchUserId: this.props.currentMatchUserId, message });
    dispatch(getChats(this.props.userId, this.props.currentMatchUserId));
    this.setState({
      message: '',
    });
  }

  render() {
    const chatMessages = () => {
      if (this.props.currentMatchChatMessages.length > 0) {
        return (
          this.props.currentMatchChatMessages
          .map((chatMessage, i) => (
            <ChatsListEntry key={i} chatMessage={chatMessage} />
          ))
        );
      }
      return (<CardText>No messages form this user. Start a conversation!</CardText>);
    };

    return (
      <div>
        <CardText>
          <TextField
            id="message"
            type="text"
            floatingLabelShrinkStyle={{ color: '#000' }}
            underlineFocusStyle={{ borderColor: '#000' }}
            value={this.state.message}
            onChange={this.saveMessage}
            floatingLabelText="Enter your message..."
          />
          <FlatButton label="Send" onClick={this.handleSendClick} />
        </CardText>
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
