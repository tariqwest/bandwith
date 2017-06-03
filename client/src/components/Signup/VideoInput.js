import React from 'react';

const SongInput = ({ video, onChange }) => (
  <p>
    <label htmlFor="video">YouTube Video Link:</label>
    <input
      required
      id="video"
      type="text"
      name="video"
      value={video}
      onChange={onChange}
    />
  </p>
);

export default SongInput;
