import React from 'react';

const LastNameInput = ({ value, onChange }) => (
  <p>
    <label htmlFor="last">
      Last Name:
    </label>
    <input
      required
      id="last"
      type="text"
      name="last"
      value={value}
      onChange={onChange}
    />
  </p>
);

export default LastNameInput;
