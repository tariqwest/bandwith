import React from 'react';
import TextField from 'material-ui/TextField';

const ZipCodeInput = ({ value, onChange }) => (
  <div>
    <TextField
      required
      hintText="Zip Code"
      id="zipCode"
      type="number"
      name="zipCode"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default ZipCodeInput;
