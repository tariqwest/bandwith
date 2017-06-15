import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { CardTitle } from 'material-ui/Card';
import LoadingSpinner from './LoadingSpinner';
import { getResultsInfo } from '../actions';
import ResultsListEntry from './ResultsListEntry';

const styles = {
  pageContainer: {
    // left and right margins
    // top and bottom padding if necesarry around multiple cards
    marginTop: '6px',
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  cardContainer: {
    // spacing between cards on a page
    marginTop: '6px',
    marginBottom: '6px',
  },
  loadingSpinner: {
    textAlign: 'center',
    width: '100%',
  },
};

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, userId } = this.props;
    dispatch(getResultsInfo(userId));
  }

  render() {
    const { results, isFetchingResults } = this.props;
    const result = results[0];

    if (isFetchingResults) {
      return (
        <div style={styles.pageContainer}>
          <div className="bump-tab-bar" />
          <Row>
            <Col xs={12} sm={6} smOffset={3}>
              <Paper zDepth={1}>
                <div style={styles.loadingSpinner}>
                  <LoadingSpinner />
                </div>
              </Paper>
            </Col>
          </Row>
        </div>
      );
    } else if (!result) {
      return (
        <div style={styles.pageContainer}>
          <div className="bump-tab-bar" />
          <Row>
            <Col xs={12} sm={6} smOffset={3} >
              <Paper style={styles.cardContainer} zDepth={1}>
                <CardTitle title="No more musicians for now, check again soon!" />
              </Paper>
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div style={styles.pageContainer}>
          <div className="bump-tab-bar" />
          <Col xs={12} sm={6} smOffset={3} >
            <Paper style={styles.cardContainer} zDepth={1}>
              <ResultsListEntry result={result} />
            </Paper>
          </Col>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  results: state.results.results,
  isFetchingResults: state.results.isFetchingResults,
});

export default connect(mapStateToProps)(Results);
