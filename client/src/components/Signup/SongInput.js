import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class SongInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <div>
        <TextField
          floatingLabelText="SoundCloud Track ID"
          required
          id="song_url"
          type="text"
          name="song_url"
          value={this.props.song}
          onChange={this.props.onChange}
        />
        <i onClick={() => this.setState({ open: true })} className="material-icons help">info</i>
        <Dialog
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
          title="How to get SoundCloud Track ID"
          actions={[
            <FlatButton
              label="Close"
              onTouchTap={() => this.setState({ open: false })}
            />,
          ]}
        >
          <img height="400px" alt="soundcloud-gif" src="/assets/SoundCloudHowToGuide.gif" />
        </Dialog>
      </div>
    );
  }
}

export default SongInput;

