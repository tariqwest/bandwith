import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class Spinner extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.props.progress(5), 20);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div>
        <CircularProgress
          mode="determinate"
          value={this.props.completed}
          size={80}
          thickness={5}
        />
      </div>
    );
  }
}

export default Spinner;
