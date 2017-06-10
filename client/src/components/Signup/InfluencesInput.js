import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import InfluenceList from './InfluenceList';

const style = {
  margin: 12,
};

const InfluenceInput = ({ influence, influences, handleChange, onClick, handleChip }) => (
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
    <InfluenceList
      handleChip={handleChip}
      selectedItems={influences}
      influence={influence}
      className="influences"
    />
  </div>
);

export default InfluenceInput;
