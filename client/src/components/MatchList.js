import React from 'react';
import MatchListEntry from './MatchListEntry';
import { connect } from 'react-redux';
import { getMatchesInfo } from '../actions';

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
      <div>
        {this.props.matches.map((match) =>
          (<MatchListEntry match={match} key={match.id} />)
        )}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  matches: state.matches.matches,
  userId: state.auth.userId,
  //currentMatchUserId: state.auth.userId === 2 ? 1 : 2, //state.chat.currentMatchUserId,
});

export default connect(mapStateToProps)(MatchList);
