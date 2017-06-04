import React from 'react';
import TextField from 'material-ui/TextField';

const LastNameInput = ({ value, onChange }) => (
  <div>
    <TextField
      hintText="Last Name"
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
