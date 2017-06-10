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

class InfluenceList extends Component {
  constructor(props) {
    super(props);
    this.handleChipDelete = this.handleChipDelete.bind(this);
  }

  handleChipDelete(item) {
    this.props.handleChip(item);
  }

  render() {
    return (
      <div style={styles.wrapper}>
        {this.props.selectedItems.length ?
            this.props.selectedItems.map(item => (
              <Chip
                style={styles.chip}
                key={item.name}
                id={item.name}
                onRequestDelete={() => this.handleChipDelete(item.name)}
              >
                {item.name}
              </Chip>),
        ) : null}
      </div>
    );
  }
}

export default InfluenceList;
