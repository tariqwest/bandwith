import React from 'react';
import TextField from 'material-ui/TextField';
import { List } from 'material-ui/List';

const FirstNameInput = ({ value, onChange }) => (
  <List>
    <TextField
      floatingLabelText="first name"
      required
      id="first"
      type="text"
      name="first"
      value={value}
      onChange={onChange}
    />
  </List>
);

export default FirstNameInput;
