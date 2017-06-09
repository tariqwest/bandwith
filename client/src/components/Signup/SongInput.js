import React from 'react';
import TextField from 'material-ui/TextField';

const SongInput = ({ song, onChange }) => (
  <div>
    <TextField
      floatingLabelText="SoundCloud Demo Link"
      required
      id="song_url"
      type="text"
      name="song_url"
      value={song}
      onChange={onChange}
    />
  </div>
);

export default SongInput;
