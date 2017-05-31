import React from 'react';
import MatchList from './MatchList';
import dummyData from '../data/dummyData';

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: dummyData,
    };
  }

  render() {
    return (
      <div>
        <h1>Connections</h1>
        <MatchList matches={this.state.matches} />
      </div>
    );
  }
}

export default Matches;
