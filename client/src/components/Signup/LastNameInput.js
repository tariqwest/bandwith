import React from 'react';
import TextField from 'material-ui/TextField';

const LastNameInput = ({ value, onChange }) => (
  <div>
    <TextField
      fullWidth
      floatingLabelText="last name"
      required
      id="last"
      type="text"
      name="last"
      value={value}
      onChange={onChange}
      floatingLabelFocusStyle={{ color: 'rgb(255, 64, 129)' }}
      underlineFocusStyle={{ borderBottomColor: 'rgb(255, 64, 129)' }}
    />
  </div>
);

export default LastNameInput;
