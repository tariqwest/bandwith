import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setCurrentMatch } from '../actions';
import { Redirect } from 'react-router';

class MatchListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: this.props.match.photo_src,
      display: this.props.match.display,
      location: this.props.match.zipCode,
    };

    this.chatWithMatch = this.chatWithMatch.bind(this);
  }

  chatWithMatch(){
    const {dispatch, history, match} = this.props;
    dispatch(setCurrentMatch(match.id));
    history.push('/chats');
  }

  render() {
    return (
      <div onClick={this.chatWithMatch}>
        <div className="connection-pic">
          <img height="150" width="150" alt="profile-pic" src={this.state.photo} />
        </div>
        <div className="connection-info">
          <div className="connection-display">{this.state.display}</div>
          <div className="connection-locationy">{this.state.location}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ userId: state.auth.userId, currentMatchUserId: state.chat.currentMatchUserId });

export default withRouter(connect(mapStateToProps)(MatchListEntry));
