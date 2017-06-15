import React from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import { Row, Col } from 'react-flexbox-grid';
import FontIcon from 'material-ui/FontIcon';
import { grey500 } from 'material-ui/styles/colors';
import MatchListEntry from './MatchListEntry';
import { getMatchesInfo } from '../actions';
import LoadingSpinner from './LoadingSpinner';

const styles = {
  chatsListContainer: {
    listStyle: 'none',
    margin: '0px -20px 0px -8px',
    padding: '0 0 50px 0',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  loadingSpinner: {
    textAlign: 'center',
    width: '100%',
  },
  nothingToDisplay: {
    textAlign: 'center',
    width: '100%',
    color: grey500,
  },
  nothingToDisplayIcon: {
    fontSize: '70px',
    color: grey500,
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
        <div>
          <div className="bump-tab-bar" />
          <Row>
            <Col xs={12} sm={6} smOffset={3}>
              <div style={styles.nothingToDisplay}>
                <FontIcon style={styles.nothingToDisplayIcon} className="material-icons">person_pin</FontIcon>
                <h2>No matches yet, check back soon!</h2>
              </div>
            </Col>
          </Row>
        </div>
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
