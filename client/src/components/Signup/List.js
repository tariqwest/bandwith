import React from 'react';
import ListEntry from './ListEntry';

const List = ({ listItems }) => (
  <span className="list">
    {listItems.map((item, index) =>
      (<ListEntry
        key={item}
        index={index}
        item={item}
      />),
    )}
  </span>
);

export default List;
