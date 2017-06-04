import React from 'react';
import TextField from 'material-ui/TextField';

const BiographyTextArea = ({ bio, onChange }) => (
  <div>
    <TextField
      floatingLabelText="Write a brief description of yourself"
      required
      multiLine={true}
      rows={4}
      rowsMax={4}
      textareaStyle={{ border: '1px solid #C0C0C0' }}
      id="bio"
      type="text"
      name="bio"
      value={bio}
      onChange={onChange}
    />
  </div>
);

export default BiographyTextArea;
