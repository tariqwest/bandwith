import React from 'react';
import { withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentMatch } from '../actions';
import { Redirect } from 'react-router';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class MatchListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.chatWithMatch = this.chatWithMatch.bind(this);
  }

  chatWithMatch(){
    const { dispatch, history, match } = this.props;
    dispatch(setCurrentMatch(match.id));
    //history.push('/chats');
  }

  render() {
    return (
      <Link to="/chats" onClick={this.chatWithMatch}>
      <ListItem
        primaryText={this.props.match.display}
        leftAvatar={<Avatar src={this.props.match.photo_src || '/assets/avatar.jpg'} />}
        rightIcon={<CommunicationChatBubble />}
        />
      </Link>
    );
  }
}

const mapStateToProps = state => ({ userId: state.auth.userId });

export default connect(mapStateToProps)(MatchListEntry);
