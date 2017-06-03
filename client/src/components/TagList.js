import React from 'react';
import Tag from './Tag';

const TagList = props => (
  <div>
    {props.tags.map(tag =>
      <Tag tag={tag} type={props.type} key={tag} />  // eslint-disable-line
    )}
  </div>
);

export default TagList;
