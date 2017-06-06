import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import List from './List';

const style = {
  margin: 12,
};

const InfluenceInput = ({ influence, influences, handleChange, onClick }) => (
  <div>
    <TextField
      floatingLabelText="musical influence"
      id="influence"
      type="text"
      name="influence"
      value={influence}
      onChange={handleChange}
    /><br />
    <RaisedButton
      label="Add Influence"
      style={style}
      name="influences"
      form="influences"
      onTouchTap={onClick}
    />
    <List
      listItems={Object.keys(influences)}
    />
  </div>
);

export default InfluenceInput;
