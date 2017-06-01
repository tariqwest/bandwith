import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import MatchList from './MatchList';

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps: ', nextProps);
    if (nextProps.userId) {
      console.log('executing get matches...');
      this.getMatches(this.setMatches.bind(this), nextProps.userId);
    }
  }

  setMatches(matches) {
    console.log('setting matches: ', matches);
    this.setState({ matches });
  }

  getMatches(callback, userId) {
    axios.get(`/api/connections?userId=${userId}`)
      .then((res) => {
        console.log('Successful GET request to /api/connections: ', res.data);
        callback(res.data);
      })
      .catch(err => console.log('Bad GET request to /api/connections: ', err));
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

const mapStateToProps = state => ({ userId: state.auth.userId });

export default connect(mapStateToProps)(Matches);
