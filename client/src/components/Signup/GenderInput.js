import React from 'react';

const GenderInput = ({ onChange }) => (
  <div>
    <p>
      Your Gender:
    </p>
    <p>
      <label htmlFor="gender" />
      <select
        required
        id="gender"
        name="gender"
        defaultValue="unspecified"
        onChange={onChange}
      >
        <option value="unspecified" >Unspecified</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
    </p>
  </div>
);

export default GenderInput;
