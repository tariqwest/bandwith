import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const GenderInput = ({ onChange, gender }) => (
  <div>
    <SelectField
      floatingLabelText="Your Gender"
      required
      id="gender"
      name="gender"
      onChange={onChange}
      value={gender}
    >
      <MenuItem value="female" primaryText="female" />
      <MenuItem value="male" primaryText="male" />
      <MenuItem value="other" primaryText="other" />
    </SelectField>
  </div>
);

export default GenderInput;
