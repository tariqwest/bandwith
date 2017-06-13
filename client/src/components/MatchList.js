import React from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import { CardText } from 'material-ui/Card';
import MatchListEntry from './MatchListEntry';
import { getMatchesInfo } from '../actions';

class MatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, userId } = this.props;
    dispatch(getMatchesInfo(userId));
  }

  render() {
    if (this.props.matches.length > 0) {
      return (
        <List>
          {this.props.matches.map(match =>
            (<MatchListEntry match={match} key={match.id} />) // eslint-disable-line
          )}
        </List>
      );
    }
    return (
      <CardText>No matches yet, check back again soon!</CardText>
    );
  }
}

const mapStateToProps = state => ({
  matches: state.matches.matches,
  userId: state.auth.userId,
});

export default connect(mapStateToProps)(MatchList);
