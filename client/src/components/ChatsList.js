import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import FontIcon from 'material-ui/FontIcon';
import { grey500 } from 'material-ui/styles/colors';
import ChatsListEntry from './ChatsListEntry';
import { getChats } from '../actions';
import LoadingSpinner from './LoadingSpinner';

const styles = {
  chatsListContainer: {
    listStyle: 'none',
    margin: '0px -20px 0px -8px',
    padding: '0 0 50px 0',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  loadingSpinner: {
    textAlign: 'center',
    width: '100%',
  },
  nothingToDisplay: {
    textAlign: 'center',
    width: '100%',
    color: grey500,
  },
  nothingToDisplayIcon: {
    fontSize: '70px',
    color: grey500,
  },
};

class ChatsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              <div style={styles.loadingSpinner}>
                <LoadingSpinner />
              </div>
            </Col>
          </Row>
        </div>
      );
    } else if (this.props.currentMatchChatMessages.length > 0) {
      return (
        <ol style={styles.chatsListContainer}>
          {
            this.props.currentMatchChatMessages
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
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
    return (
      <div>
        <div className="bump-tab-bar" />
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <div style={styles.nothingToDisplay}>
              <FontIcon style={styles.nothingToDisplayIcon} className="material-icons">
                chat
              </FontIcon>
              <h2>Start a conversation!</h2>
            </div>
          </Col>
        </Row>
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
