import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const GenderInput = ({ onChange, value }) => (
  <SelectField
    fullWidth
    floatingLabelText="gender"
    required
    style={{ textAlign: 'left' }}
    value={value}
    id="gender"
    name="gender"
    onChange={onChange}
    floatingLabelFocusStyle={{ color: 'rgb(255, 64, 129)' }}
    underlineFocusStyle={{ borderBottomColor: 'rgb(255, 64, 129)' }}
  >
    <MenuItem value="Female" primaryText="Female" />
    <MenuItem value="Male" primaryText="Male" />
    <MenuItem value="Other" primaryText="Other" />
  </SelectField>
);

export default GenderInput;
