import React from 'react';

class Tag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      tagName: this.props.tag,
    };
  }

  render() {
    return (
      <span>{this.state.tagName} </span>
    );
  }
}

export default Tag;
