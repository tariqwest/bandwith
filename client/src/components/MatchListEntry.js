import React from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import FlatButton from 'material-ui/FlatButton';
import Chats from './Chats';
import { setCurrentMatch } from '../actions';

class MatchListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.chatWithMatch = this.chatWithMatch.bind(this);
    this.state = {
      showChat: false,
    };
  }

  chatWithMatch() {
    const { dispatch, match } = this.props;
    dispatch(setCurrentMatch(match.id));
    this.setState({ showChat: true });
  }

  render() {
    return (
      <div>
        <div onClick={this.chatWithMatch}>
          <ListItem
            primaryText={`${this.props.match.first} ${this.props.match.last}`}
            leftAvatar={<Avatar src={this.props.match.photo_src || '/assets/avatar.jpg'} />}
            rightIcon={<CommunicationChatBubble />}
          />
        </div>
        <FullscreenDialog
          open={this.state.showChat}
          onRequestClose={() => this.setState({ showChat: false })}
          title={this.props.match.display}
          actionButton={<FlatButton
            label="Close"
            onTouchTap={() => this.setState({ showChat: false })}
          />}
          appBarStyle={{ backgroundColor: '#000000' }}
        >
          <Chats />
        </FullscreenDialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
});

export default connect(mapStateToProps)(MatchListEntry);
