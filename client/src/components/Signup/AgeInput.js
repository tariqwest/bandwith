import React from 'react';
import TextField from 'material-ui/TextField';

const AgeInput = ({ value, onChange }) => (
  <div>
    <TextField
      required
      hintText="How old are you?"
      id="age"
      type="number"
      name="age"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default AgeInput;
