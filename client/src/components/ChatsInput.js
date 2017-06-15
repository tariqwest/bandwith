import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { Card, CardText, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { addSentChat, addReceivedChat } from '../actions';

const styles = {
  chatInputBar: {
    position: 'absolute',
    bottom: '0px',
    width: '100%',
    height: '50px',
    backgroundColor: '#fff',
    zIndex: '100',
  },
  chatInputField: {
    border: '0px',
    width: '100%',
    height: '100%',
    padding: '10px',
    outline: 'none',
    fontSize: '16px',
  },
  chatInputButton: {
    position: 'absolute',
    top: 4,
    right: -4,
  },
};

class ChatsInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
    this.handleSendClick = this.handleSendClick.bind(this);
    this.saveMessage = this.saveMessage.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.socket = io('http://localhost:3000');
    this.socket.on('chat:received', (receivedChat) => {
      dispatch(addReceivedChat(receivedChat));
    });
    this.socket.on('chat:sent:success', (sentChat) => {
      dispatch(addSentChat(sentChat));
      this.setState({
        message: '',
      });
    });
  }

  saveMessage(event) {
    this.setState({
      message: event.target.value,
    });
  }

  handleSendClick() {
    const message = this.state.message;
    const sentChat = {
      userId: this.props.userId,
      matchUserId: this.props.currentMatchUserId,
      message,
    };
    this.socket.emit('chat:sent', sentChat);
  }

  render() {

    return (
      <div>
        <Card style={styles.chatInputBar}>
          <Row>
            <Col xs={10} sm={11}>
              <textarea
                style={styles.chatInputField}
                id="message"
                value={this.state.message}
                onChange={this.saveMessage}
                placeholder={'Enter your message...'}
              />
            </Col>
            <Col xs={2} sm={1}>
              <IconButton
                label="Send"
                onClick={this.handleSendClick}
                style={styles.chatInputButton}
              >
                <FontIcon className="material-icons">send_icon</FontIcon>
              </IconButton>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentMatchChatMessages: state.chat.currentMatchChatMessages,
  userId: state.auth.userId,
  currentMatchUserId: state.chat.currentMatchUserId,
});

export default connect(mapStateToProps)(ChatsInput);
