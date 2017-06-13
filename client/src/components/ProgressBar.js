import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';

class ProgressBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(5), 100);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({ completed: 100 });
    } else {
      this.setState({ completed });
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 100);
    }
  }

  render() {
    return (
      <LinearProgress mode="determinate" value={this.state.completed} />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isFetchingResults: state.results.isFetching,
});

export default connect(mapStateToProps)(ProgressBar);
