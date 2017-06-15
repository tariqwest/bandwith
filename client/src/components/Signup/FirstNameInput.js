import React from 'react';
import TextField from 'material-ui/TextField';

const FirstNameInput = ({ value, onChange }) => (
  <TextField
    fullWidth
    floatingLabelText="first name"
    required
    id="first"
    type="text"
    name="first"
    value={value}
    onChange={onChange}
    floatingLabelFocusStyle={{ color: 'rgb(255, 64, 129)' }}
    underlineFocusStyle={{ borderBottomColor: 'rgb(255, 64, 129)' }}
  />
);

export default FirstNameInput;
