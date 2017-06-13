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
  />
);

export default AgeInput;
