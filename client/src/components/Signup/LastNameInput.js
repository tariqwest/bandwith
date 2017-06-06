import React from 'react';
import TextField from 'material-ui/TextField';

const LastNameInput = ({ value, onChange }) => (
  <div>
    <TextField
      floatingLabelText="last name"
      required
      id="last"
      type="text"
      name="last"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default LastNameInput;
