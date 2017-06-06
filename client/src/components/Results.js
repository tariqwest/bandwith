import React from 'react';
import { connect } from 'react-redux';
import { getResultsInfo } from '../actions';
import FlatButton from 'material-ui/FlatButton';
import ResultsListEntry from './ResultsListEntry';

class Results extends React.Component {

  componentDidMount() {
    const { dispatch, userId } = this.props;
    dispatch(getResultsInfo(userId));
  }

  render() {
    const { results } = this.props;
    const currentResult = results[0];

    if (!results.length) {
      return (
        <div>
          <h1>Find a Musician</h1>
          <h3>No more musicians match your preferences</h3>
        </div>
      );
    }
    return (
      <div>
        <h1>Find a Musician</h1>
        <ResultsListEntry currentResult={currentResult} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  results: state.results.results,
});

export default connect(mapStateToProps)(Results);
