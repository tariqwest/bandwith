import React from 'react';
import TextField from 'material-ui/TextField';

const FirstNameInput = ({ value, onChange }) => (
  <div>
    <TextField
      floatingLabelText="First Name"
      required
      id="first"
      type="text"
      name="first"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default FirstNameInput;
