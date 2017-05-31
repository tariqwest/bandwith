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
      userId: 2,
    };
  }

  updateConnections(choice) {
    const body = {
      userId: this.state.userId,
      profileId: this.state.currentResult.id,
      choice,
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    };

    fetch('/api/connections', options)
      .then(() => console.log('Successful POST request to /connections'))
      .catch(err => console.log('Bad POST request to /connections', err));
  }

  clickNo() {
    this.updateConnections(false);
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
    this.updateConnections(true);
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
