import React from 'react';
import TextField from 'material-ui/TextField';

const LastNameInput = ({ value, onChange }) => (
  <div>
    <TextField
      floatingLabelText="Last Name"
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
