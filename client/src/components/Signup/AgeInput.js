import React from 'react';

const AgeInput = ({ value, onChange }) => (
  <p>
    <label htmlFor="age">
      How old are you?
    </label>
    <input
      required
      id="age"
      type="number"
      name="age"
      value={value}
      onChange={onChange}
    />
  </p>
);

export default AgeInput;
