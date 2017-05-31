import React from 'react';

class Tag extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      type: this.props.type,
      tagName: this.props.tag,
    };
  }

  render() {
    return (
      <div>{this.state.tagName}</div>
    );
  }
}

export default Tag;
