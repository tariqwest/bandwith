import React from 'react';
import TextField from 'material-ui/TextField';

const SearchRadiusInput = ({ radius, onChange, radiusErrorText }) => (
  <div>
    <TextField
      required
      floatingLabelText="search radius"
      id="search_radius"
      name="search_radius"
      data-name="search radius"
      style={{ width: '40%' }}
      errorText={radiusErrorText}
      value={radius}
      onChange={onChange}
    />
  </div>
);

export default SearchRadiusInput;
