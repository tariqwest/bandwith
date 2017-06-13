import React from 'react';
import TextField from 'material-ui/TextField';

const VideoInput = ({ video, onChange }) => (
  <div>
    <TextField
      floatingLabelText="YouTube Video Link"
      required
      id="video_url"
      type="text"
      name="video_url"
      value={video}
      onChange={onChange}
    />
  </div>
);

export default VideoInput;
