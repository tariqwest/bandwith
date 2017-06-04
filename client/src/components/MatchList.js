import React from 'react';
import MatchListEntry from './MatchListEntry';
import { connect } from 'react-redux';
import { getMatchesInfo } from '../actions';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class MatchList extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const { dispatch, userId } = this.props;
    dispatch(getMatchesInfo(userId));
  }

  render(){
    return (
      <List>
      <div>
        {this.props.matches.map((match) =>
          (<MatchListEntry match={match} key={match.id} />)
        )}
      </div>
      </List>
    );
  }
};

const mapStateToProps = state => ({
  matches: state.matches.matches,
  userId: state.auth.userId,
  //currentMatchUserId: state.auth.userId === 2 ? 1 : 2, //state.chat.currentMatchUserId,
});

export default connect(mapStateToProps)(MatchList);
