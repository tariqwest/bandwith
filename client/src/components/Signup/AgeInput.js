import React from 'react';
import TextField from 'material-ui/TextField';

const AgeInput = ({ value, onChange, ageErrorText }) => (
  <TextField
    fullWidth
    required
    floatingLabelText="age"
    id="age"
    name="age"
    data-name="age"
    errorText={ageErrorText}
    value={value}
    onChange={onChange}
  />
);

export default AgeInput;
