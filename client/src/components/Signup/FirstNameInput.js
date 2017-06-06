import React from 'react';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';

const FirstNameInput = ({ value, onChange }) => (
  <List>
    <ListItem leftIcon={<i className="material-icons" >perm_identity</i>} >
      <TextField
        floatingLabelText="First Name"
        required
        id="first"
        type="text"
        name="first"
        value={value}
        onChange={onChange}
      />
    </ListItem>
  </List>
);

export default FirstNameInput;
