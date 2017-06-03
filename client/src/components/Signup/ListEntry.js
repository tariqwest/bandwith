import React from 'react';

const ListEntry = ({ item, length, index }) => (
  index === length - 1 ?
    <span className="list-entry">
      {` ${item} `}
    </span> :
    <span className="list-entry">
      {` ${item}, `}
    </span>
);

export default ListEntry;
