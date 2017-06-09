import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const GenderInput = ({ onChange, value }) => (
  <div>
    <SelectField
      floatingLabelText="gender"
      required
      style={{ textAlign: 'left' }}
      value={value}
      id="gender"
      name="gender"
      onChange={onChange}
    >
      <MenuItem value="Female" primaryText="Female" />
      <MenuItem value="Male" primaryText="Male" />
      <MenuItem value="Other" primaryText="Other" />
    </SelectField>
  </div>
);

export default GenderInput;
