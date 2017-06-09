import React from 'react';
import TextField from 'material-ui/TextField';

const ZipCodeInput = ({ value, onChange, zipErrorText }) => (
  <div>
    <TextField
      required
      floatingLabelText="zip code"
      id="zipcode"
      name="zipcode"
      data-name="zip code"
      errorText={zipErrorText}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default ZipCodeInput;
