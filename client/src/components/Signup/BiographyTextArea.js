import React from 'react';
import TextField from 'material-ui/TextField';

const BiographyTextArea = ({ bio, onChange }) => (
  <div>
    <TextField
      required
      floatingLabelText="about you"
      multiLine
      rows={1}
      style={{ textAlign: 'left' }}
      id="bio"
      type="text"
      name="bio"
      value={bio}
      onChange={onChange}
    />
  </div>
);

export default BiographyTextArea;
