import React from 'react';
import TextField from 'material-ui/TextField';

const AgeInput = ({ value, onChange, ageErrorText }) => (
  <TextField
    fullWidth
    required
    id="age"
    name="age"
    data-name="age"
    value={value}
    onChange={onChange}
    floatingLabelText="age"
    errorText={ageErrorText}
    floatingLabelFocusStyle={{ color: 'rgb(255, 64, 129)' }}
    underlineFocusStyle={{ borderBottomColor: 'rgb(255, 64, 129)' }}
  />
);

export default AgeInput;
