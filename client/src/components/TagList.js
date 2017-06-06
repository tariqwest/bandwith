import React from 'react';
import Tag from './Tag';

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const TagList = props => (
  <div style={styles.wrapper} >
    {props.tags.map(tag =>
      <Tag tag={tag} type={props.type} key={tag} />  // eslint-disable-line
    )}
  </div>
);

export default TagList;
