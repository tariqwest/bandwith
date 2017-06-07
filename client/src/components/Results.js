import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { getResultsInfo } from '../actions';
import ResultsListEntry from './ResultsListEntry';

const style = {
  margin: 10,
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
        <Row>
          <Col xs={12} sm={6} smOffset={3} >
            <h3>No more musicians match your preferences</h3>
          </Col>
        </Row>
      );
    }
    return (
      <Col xs={12} sm={6} smOffset={3} >
        <Paper style={style} zDepth={1}>
          <ResultsListEntry result={result} />
        </Paper>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  results: state.results.results,
});

export default connect(mapStateToProps)(Results);
