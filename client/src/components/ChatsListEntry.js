import React from 'react';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import axios from 'axios';

class ChatListEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const secondary = moment(this.props.chatMessage.created_at).fromNow();
    if (this.props.chatMessage.profile_id_from === this.props.user.id) {
      return (
        <ListItem
          primaryText={this.props.chatMessage.message}
          secondaryText={secondary}
          rightAvatar={<Avatar src={this.props.user.photo_src_small || '/assets/avatar.jpg'} />}
          style={{ textAlign: 'right' }}
        />
      );
    }
    return (
      <ListItem
        primaryText={this.props.chatMessage.message}
        secondaryText={secondary}
        leftAvatar={<Avatar src={this.props.currentMatch.photo_src_small || '/assets/avatar.jpg'} />}
      />
    );
  }
}

const mapStateToProps = state => ({
  chat: state.chat,
  user: state.user.profile,
});

export default connect(mapStateToProps)(ChatListEntry);
