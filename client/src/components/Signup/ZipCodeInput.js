import React from 'react';
import TextField from 'material-ui/TextField';

const ZipCodeInput = ({ value, onChange, zipErrorText }) => (
  <TextField
    fullWidth
    required
    floatingLabelText="zip code"
    id="zipcode"
    name="zipcode"
    data-name="zip code"
    errorText={zipErrorText}
    value={value}
    onChange={onChange}
    floatingLabelFocusStyle={{ color: 'rgb(255, 64, 129)' }}
    underlineFocusStyle={{ borderBottomColor: 'rgb(255, 64, 129)' }}
  />
);

export default ZipCodeInput;
