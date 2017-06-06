import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import { setCurrentMatch } from '../actions';

class MatchListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.chatWithMatch = this.chatWithMatch.bind(this);
  }

  chatWithMatch(){
    const { dispatch, match } = this.props;
    dispatch(setCurrentMatch(match.id, match.first, match.last, match.photo_src));
  }

  render() {
    return (
      <Link to="/chats" onClick={this.chatWithMatch}>
        <ListItem
          primaryText={this.props.match.first + ' ' + this.props.match.last}
          leftAvatar={<Avatar src={this.props.match.photo_src || '/assets/avatar.jpg'} />}
          rightIcon={<CommunicationChatBubble />}
        />
      </Link>
    );
  }
}

const mapStateToProps = state => ({ userId: state.auth.userId });

export default connect(mapStateToProps)(MatchListEntry);
