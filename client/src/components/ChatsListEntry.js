import React from 'react';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import axios from 'axios';

class ChatListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromName: '',
      fromPhotoSrc: '',
    };
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    this.getUserInfo(this.props.chatMessage.profile_id_from);
  }

  getUserInfo(userId) {
    axios.get(`/api/profiles/${userId}`)
      .then((response) => {
        this.setState({
          fromName: `${response.data.first} ${response.data.last}`,
          fromPhotoSrc: response.data.photo_src,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const secondary = moment(this.props.chatMessage.created_at).fromNow();
    if (this.props.chatMessage.profile_id_from === this.props.user.id) {
      return (
        <ListItem
          primaryText={this.props.chatMessage.message}
          secondaryText={secondary}
          rightAvatar={<Avatar src={this.state.fromPhotoSrc || '/assets/avatar.jpg'} />}
          style={{ textAlign: 'right' }}
        />
      );
    }
    return (
      <ListItem
        primaryText={this.props.chatMessage.message}
        secondaryText={secondary}
        leftAvatar={<Avatar src={this.state.fromPhotoSrc || '/assets/avatar.jpg'} />}
      />
    );
  }
}

const mapStateToProps = state => ({
  chat: state.chat,
  user: state.user.profile,
});

export default connect(mapStateToProps)(ChatListEntry);
