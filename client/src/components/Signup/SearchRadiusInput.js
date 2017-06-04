import React from 'react';
import TextField from 'material-ui/TextField';

const SearchRadiusInput = ({ radius, onChange, radiusErrorText }) => (
  <div>
    <TextField
      required
      floatingLabelText="Im looking for musicians within this many miles"
      id="searchRadius"
      name="searchRadius"
      data-name="search radius"
      style={{ width: '40%' }}
      errorText={radiusErrorText}
      value={radius}
      onChange={onChange}
    />
  </div>
);

export default SearchRadiusInput;
