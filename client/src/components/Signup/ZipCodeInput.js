import React from 'react';

const ZipCodeInput = ({ value, onChange }) => (
  <p>
    <label htmlFor="zipCode">
      Zip Code:
    </label>
    <input
      required
      id="zipCode"
      type="number"
      name="zipCode"
      value={value}
      onChange={onChange}
    />
  </p>
);

export default ZipCodeInput;
