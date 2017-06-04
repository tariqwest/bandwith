import React from 'react';
import TextField from 'material-ui/TextField';

const SongInput = ({ song, onChange }) => (
  <div>
    <TextField
      floatingLabelText="SoundCloud Demo Link"
      required
      id="song"
      type="text"
      name="song"
      value={song}
      onChange={onChange}
    />
  </div>
);

export default SongInput;
