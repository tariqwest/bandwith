import React from 'react';
import { withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentMatch } from '../actions';
import { Redirect } from 'react-router';

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
      <div>
        <div className="connection-pic">
          <img height="150" width="150" alt="profile-pic" src={this.props.match.photo_src} />
        </div>
        <div className="connection-info">
          <div className="connection-display">{this.props.match.display}</div>
          <div className="connection-locationy">{this.props.match.zipCode}</div>
        </div>
      </div>
      </Link>
    );
  }
}

const mapStateToProps = state => ({ userId: state.auth.userId });

export default connect(mapStateToProps)(MatchListEntry);
