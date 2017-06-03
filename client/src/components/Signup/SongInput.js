import React from 'react';

const SongInput = ({ song, onChange }) => (
  <p>
    <label htmlFor="song">SoundCloud Demo Link:</label>
    <input
      required
      id="song"
      type="text"
      name="song"
      value={song}
      onChange={onChange}
    />
  </p>
);

export default SongInput;
