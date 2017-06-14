import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import ChatsListEntry from './ChatsListEntry';
import { getChats } from '../actions';
import LoadingSpinner from './LoadingSpinner';

const styles = {
  chatsListContainer: {
    listStyle: 'none',
    margin: 0,
    padding: '0 0 50px 0',
    overflowY: 'auto',
  },
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
        <ol style={styles.chatsListContainer}>
          {
            this.props.currentMatchChatMessages
            .map(chatMessage => (
              <ChatsListEntry
                key={chatMessage.id}
                chatMessage={chatMessage}
                currentMatch={this.props.currentMatch}
              />
            ))
          }
        </ol>
      );
    }
    return (<CardText>Start a conversation!</CardText>);
  }
}

const mapStateToProps = state => ({
  currentMatchChatMessages: state.chat.currentMatchChatMessages,
  userId: state.auth.userId,
  currentMatchUserId: state.chat.currentMatchUserId,
  isFetching: state.chat.isFetching,
});

export default connect(mapStateToProps)(ChatsList);
