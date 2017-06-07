import React, { Component } from 'react';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class List extends Component {
  constructor(props) {
    super(props);
    this.handleChipDelete = this.handleChipDelete.bind(this);
  }

  handleChipDelete(key) {
    const collection = this.props.className;

    this.props.addChip(key, collection);
  }

  render() {
    return (
      <div style={styles.wrapper}>
        {this.props.selectedItems.length ?
            this.props.selectedItems.map(item => (
              <Chip
                style={styles.chip}
                key={item}
                id={item}
                onRequestDelete={() => this.handleChipDelete(item)}
              >
                {item}
              </Chip>),
        ) : null}
      </div>
    );
  }
}

export default List;
