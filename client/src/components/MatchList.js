import React from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import { CardTitle } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import MatchListEntry from './MatchListEntry';
import { getMatchesInfo } from '../actions';
import LoadingSpinner from './LoadingSpinner';

const styles = {
  loadingSpinner: {
    textAlign: 'center',
    width: '100%',
  },
};

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
    if (this.props.isFetching) {
      return (
        <div>
          <div className="bump-tab-bar" />
          <Row>
            <Col xs={12} sm={6} smOffset={3}>
                <div style={styles.loadingSpinner}>
                  <LoadingSpinner />
                </div>
            </Col>
          </Row>
        </div>
      );
    } else if (this.props.matches.length > 0) {
      return (
        <List>
          {this.props.matches.map(match =>
            (<MatchListEntry match={match} key={match.id} />) // eslint-disable-line
          )}
        </List>
      );
    } else {
      return (
        <CardTitle title="No connections yet, check back again soon!" />
      );
    }
  }
}

const mapStateToProps = state => ({
  matches: state.matches.matches,
  userId: state.auth.userId,
  isFetching: state.matches.isFetching,
});

export default connect(mapStateToProps)(MatchList);
