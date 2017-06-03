import React from 'react';

const BiographyTextArea = ({ bio, onChange }) => (
  <div>
    <p>
      <label htmlFor="bio">
        Biography:
      </label>
    </p>
    <p>
      <textarea
        required
        rows="4"
        cols="50"
        id="bio"
        type="text"
        name="bio"
        placeholder="tell us about yourself ..."
        value={bio}
        onChange={onChange}
      >
        Write a brief description of yourself
      </textarea>
    </p>
  </div>
);

export default BiographyTextArea;
