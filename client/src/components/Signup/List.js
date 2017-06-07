import React from 'react';
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

const List = ({ selectedItems, onChange }) => (
  <div style={styles.wrapper}>
    {selectedItems.length ?
        selectedItems.map(item => (
          <Chip
            style={styles.chip}
            key={item}
            onRequestDelete={onChange}
          >
            {item}
          </Chip>),
    ) : null}
  </div>
);

export default List;
