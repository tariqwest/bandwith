import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import MatchList from './MatchList';
import { getMatchesInfo } from '../actions';

class Matches extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Connections</h1>
        <MatchList />
      </div>
    );
  }
}

const mapStateToProps = state => ({ userId: state.auth.userId });

export default connect(mapStateToProps)(Matches);
