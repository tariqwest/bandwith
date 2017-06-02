import React from 'react';
import ChatsListEntry from './ChatsListEntry';
import { connect } from 'react-redux';
import { sendChat, getChats } from '../actions';

class ChatsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyUserId: 1,
      dummyMatchUserId: 2,
    };
  }

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(getChats(this.props.userId));
  }

  render() {
    const chatMessages = () => {
      if (this.props.allChatMessages.length > 0) {
        return (
          this.props.allChatMessages.map((chatMessage, i) => {
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
          Send Message Placeholder
        </div>
        {chatMessages()}
      </div>
    );
  }

}

const mapStateToProps = state => ({
  allChatMessages: state.chat.allChatMessages,
  userId: state.auth.userId,
});

export default connect(mapStateToProps)(ChatsList);
