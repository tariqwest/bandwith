import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import { grey500 } from 'material-ui/styles/colors';
import LoadingSpinner from './LoadingSpinner';
import { getResultsInfo } from '../actions';
import ResultsListEntry from './ResultsListEntry';

const styles = {
  pageContainer: {
    // left and right margins
    // top and bottom padding if necesarry around multiple cards
    marginTop: '6px',
    paddingLeft: '6px',
    paddingRight: '6px',
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
            <Col xs={12} sm={2} smOffset={2} >
                <div style={styles.loadingSpinner}>
                  <LoadingSpinner />
                </div>
            </Col>
          </Row>
        </div>
      );
    } else if (!result) {
      return (
        <div style={styles.pageContainer}>
          <div className="bump-tab-bar" />
          <div className="bump-tab-bar" />
          <Row>
            <Col xs={12} sm={8} smOffset={2}>
              <div style={styles.nothingToDisplay}>
                <FontIcon style={styles.nothingToDisplayIcon} className="material-icons">location_searching</FontIcon>
                <h2>We didn't find any compatible folks, check back soon!</h2>
              </div>
            </Col>
          </Row>
        </div>
      );
    }
    return (
      <div style={styles.pageContainer}>
        <div className="bump-tab-bar" />
        <Row>
          <Col xs={12} sm={8} smOffset={2} >
            <Paper style={styles.cardContainer} zDepth={1}>
              <ResultsListEntry result={result} />
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  results: state.results.results,
  isFetchingResults: state.results.isFetchingResults,
});

export default connect(mapStateToProps)(Results);
