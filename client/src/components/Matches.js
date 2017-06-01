import React from 'react';
import { connect } from 'react-redux';
import MatchList from './MatchList';
import dummyData from '../data/dummyData';

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: dummyData,
    };
  }

  componentDidMount() {
    this.getMatches(this.setMatches.bind(this));
  }

  setMatches(matches) {
    this.setState({ matches });
  }

  getMatches(callback) {
    fetch(`/api/connections?userId=${this.props.userId}`)
      .then((response) => {
        console.log('Successful GET request to /connections: ', response);
        // callback(response);
      })
      .catch(err => console.log('Bad GET request to /connections: ', err));
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
