import React from 'react';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
};

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
      <Chip style={styles.chip}>{this.state.tagName}</Chip>
    );
  }
}

export default Tag;
