import React from 'react';
import TextField from 'material-ui/TextField';

const BiographyTextArea = ({ bio, onChange }) => (
  <div>
    <TextField
      fullWidth
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
      floatingLabelFocusStyle={{ color: 'rgb(255, 64, 129)' }}
      underlineFocusStyle={{ borderBottomColor: 'rgb(255, 64, 129)' }}
    />
  </div>
);

export default BiographyTextArea;
