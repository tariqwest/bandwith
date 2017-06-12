import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { getResultsInfo } from '../actions';
import ResultsListEntry from './ResultsListEntry';

const styles = {
  paper: { margin: 10 },
  title: { textAlign: 'center' },
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
    const { results } = this.props;
    const result = results[0];

    if (!result) {
      return (
        <div>
          <div className="bump-tab-bar" />
          <Row>
            <Col xs={12} sm={6} smOffset={3} >
              <h3 style={styles.title}>No more matches for now, check again soon!</h3>
            </Col>
          </Row>
        </div>
      );
    }
    return (
      <div>
        <div className="bump-tab-bar" />
        <Col xs={12} sm={6} smOffset={3} >
          <Paper style={styles.paper} zDepth={1}>
            <ResultsListEntry result={result} />
          </Paper>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  results: state.results.results,
});

export default connect(mapStateToProps)(Results);
