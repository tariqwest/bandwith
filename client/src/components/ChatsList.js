import React from 'react';
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
    dispatch(getChats(this.props.userId));
  }

  render() {
    const chatMessages = () => {
      if (this.props.allChatMessages.length > 0) {
        return (
          this.props.allChatMessages
          .filter((chatMessage)=>{
            return (chatMessage.profile_id_to === this.props.matchUserId ||
              chatMessage.profile_id_from === this.props.matchUserId
            );
          })
          .map((chatMessage, i) => {
            return <ChatsListEntry key={i} chatMessage={chatMessage} />;
          })
        );
      } else {
        return (<div> No messages </div>);
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
    let message = document.getElementById("message").value;
    dispatch(sendChat(this.props.userId, this.props.matchUserId, message));
    document.getElementById("message").value ='';
  }
}

const mapStateToProps = state => ({
  allChatMessages: state.chat.allChatMessages,
  userId: state.auth.userId || 2,
  matchUserId: state.chat.matchUserId || 1,
});

export default connect(mapStateToProps)(ChatsList);
