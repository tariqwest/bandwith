import React from 'react';

const SearchRadiusInput = ({ radius, onChange }) => (
  <p>
    <label htmlFor="searchRadius">Im looking for musicians within this many miles:</label>
    <input
      required
      id="searchRadius"
      type="number"
      name="searchRadius"
      value={radius}
      onChange={onChange}
    />
  </p>
);

export default SearchRadiusInput;
