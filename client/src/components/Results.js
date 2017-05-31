import React from 'react';
import ResultsListEntry from './ResultsListEntry';
import dummyData from '../data/dummyData';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      results: dummyData,
      currentResult: dummyData[0],
    };
  }

  clickNo(event) {
    console.log('CLICK NO: ', this);
    const newIndex = this.state.index + 1;
    this.setState({
      index: newIndex,
      currentResult: this.state.results[newIndex],
    });
    console.log('NO STATE: ', this.state);
  }

  clickYes(event) {
    console.log('CLICK YES: ', this);
    const newIndex = this.state.index + 1;
    this.setState({
      index: newIndex,
      currentResult: this.state.results[newIndex],
    });
    console.log('YES STATE: ', this.state);
  }

  render() {
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
