import React from 'react';
import Tag from './Tag';

const TagList = props => {
  return (
    <div>
      {props.tags.map((tag) =>
        <Tag tag={tag} type={props.type} key={tag} />
      )}
    </div>
  );
};

export default TagList;
