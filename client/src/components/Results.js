import React from 'react';
import ResultsListEntry from './ResultsListEntry';
import dummyData from '../data/dummyData';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      results: dummyData,
      size: dummyData.length - 1,
      currentResult: dummyData[0],
      noMoreResults: false,
    };
  }

  clickNo() {
    const newIndex = this.state.index + 1;
    if (newIndex > this.state.size) {
      this.setState({
        noMoreResults: true,
      });
    } else {
      this.setState({
        index: newIndex,
        currentResult: this.state.results[newIndex],
      });
    }
  }

  clickYes() {
    const newIndex = this.state.index + 1;
    if (newIndex > this.state.size) {
      this.setState({
        noMoreResults: true,
      });
    } else {
      this.setState({
        index: newIndex,
        currentResult: this.state.results[newIndex],
      });
    }
  }

  render() {
    if (this.state.noMoreResults) {
      return (
        <div>
          <h1>No more musicians match your preferences</h1>
        </div>
      );
    }
    return (
      <div>
        <h1>Find a Musician</h1>
        <div className="profile-decide">
          <button type="button" onClick={this.clickNo.bind(this)}>No</button>
          <button type="button" onClick={this.clickYes.bind(this)}>Yes</button>
        </div>
        <ResultsListEntry result={this.state.currentResult} />
      </div>
    );
  }
}

export default Results;
