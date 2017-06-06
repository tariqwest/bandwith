import React from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import MatchListEntry from './MatchListEntry';
import { getMatchesInfo } from '../actions';

class MatchList extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    const { dispatch, userId } = this.props;
    dispatch(getMatchesInfo(userId));
  }

  render(){
    return (
      <List>
        {this.props.matches.map(match =>
          (<MatchListEntry match={match} key={match.id} />) // eslint-disable-line
        )}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  matches: state.matches.matches,
  userId: state.auth.userId,
});

export default connect(mapStateToProps)(MatchList);
