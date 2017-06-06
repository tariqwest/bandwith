import React from 'react';
import Chip from 'material-ui/Chip';

const styles = {
  margin: 4,
};

const ListEntry = ({ item }) => (
  <Chip style={styles} >
    {` ${item} `}
  </Chip>
);

export default ListEntry;
