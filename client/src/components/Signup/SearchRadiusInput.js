import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const SearchRadiusInput = ({ radius, onChange, radiusErrorText }) => (
    <SelectField
      fullWidth
      floatingLabelText="search radius"
      id="search_radius"
      name="search_radius"
      value={Number(radius)}
      onChange={onChange}
      data-name="search radius"
      errorText={radiusErrorText}
    >
      <MenuItem value={1} primaryText="1 mile" />
      <MenuItem value={5} primaryText="5 miles" />
      <MenuItem value={10} primaryText="10 miles" />
      <MenuItem value={20} primaryText="20 miles" />
      <MenuItem value={30} primaryText="30 miles" />
      <MenuItem value={40} primaryText="40 miles" />
      <MenuItem value={50} primaryText="50 miles" />
    </SelectField>
);

export default SearchRadiusInput;

