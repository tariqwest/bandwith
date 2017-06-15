import React from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import { Row, Col } from 'react-flexbox-grid';

const styles = {
  chatEntryContainer: {
    padding: '0.5rem',
    overflow: 'hidden',
    position: 'relative',
  },
  chatEntryMessageContainer: {
    display: 'inline-block',
    background: 'white',
    padding: '10px',
    borderRadius: '2px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    maxWidth: '80%',
  },
  chatEntryText: {
    fontSsize: '0.8rem',
    margin: '0 0 0.2rem 0',
  },
  chatEntryTime: {
    fontSize: '0.7rem',
    color: '#ccc',
  },
  chatEntryAvatar: {
    display: 'inline-block',
    width: '40px',
    height: '40px',
    position: 'relative',
    top: '20px',
  },
  avatarLeft: {
    margin: '0px 10px 0px 0px',
  },
  avatarRight: {
    margin: '0px 0px 0px 10px',
  },
  positionLeft: {
    float: 'left',
    textAlign: 'left',
  },
  positionRight: {
    float: 'right',
    textAlign: 'right',
  },
  arrowLeft: {
    display: 'inline-block',
    width: 0,
    height: 0,
    borderTop: '8px solid transparent',
    borderBottom: '8px solid transparent',
    borderRight: '8px solid #fff',
    position: 'relative',
    top: 10,
    paddingLeft: '2px',
  },
  arrowRight: {
    display: 'inline-block',
    width: 0,
    height: 0,
    borderTop: '8px solid transparent',
    borderBottom: '8px solid transparent',
    borderLeft: '8px solid #fff',
    position: 'absolute',
    bottom: 15,
    paddingRight: '10px',
  },
};

class ChatListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const time = moment(this.props.chatMessage.created_at).fromNow();
    if (this.props.chatMessage.profile_id_from === this.props.user.id) {
      styles.myMessage = Object.assign(styles.chatEntryContainer, styles.positionRight);
      styles.myAvatar = Object.assign(styles.chatEntryAvatar, styles.avatarRight);

      return (
        <Row>
          <Col xs={10} xsOffset={2} sm={8} smOffset={4}>
            <li
              style={styles.myMessage}
            >
              <div style={styles.chatEntryMessageContainer}>
                <div style={styles.chatEntryText}>{this.props.chatMessage.message}</div>
                <div style={styles.chatEntryTime}>{time}</div>
              </div>
              <div style={styles.arrowRight} />
              <Avatar style={styles.chatEntryAvatar} src={this.props.user.photo_src_small || '/assets/avatar.jpg'} />
            </li>
          </Col>
        </Row>
      );
    }

    styles.theirMessage = Object.assign(styles.chatEntryContainer, styles.positionLeft);

    return (
      <Row>
        <Col xs={10} sm={8}>
          <li
            style={styles.theirMessage}
          >
            <Avatar style={styles.chatEntryAvatar} src={this.props.currentMatch.photo_src_small || '/assets/avatar.jpg'} />
            <div style={styles.arrowLeft} />
            <div style={styles.chatEntryMessageContainer}>
              <div style={styles.chatEntryText}>{this.props.chatMessage.message}</div>
              <div style={styles.chatEntryTime}>{time}</div>
            </div>
          </li>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  chat: state.chat,
  user: state.user.profile,
  isFetching: state.chat.isFetching,
});

export default connect(mapStateToProps)(ChatListEntry);
