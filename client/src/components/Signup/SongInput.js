import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const style = {
  field: { width: '92%' },
  dialog: { textAlign: 'center' },
  title: { textAlign: 'left' },
};

class SongInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <div>
        <TextField
          floatingLabelText="SoundCloud Embed Link"
          required
          style={style.field}
          id="song_url"
          type="text"
          name="song_url"
          value={this.props.song}
          onChange={this.props.onChange}
          floatingLabelFocusStyle={{ color: 'rgb(255, 64, 129)' }}
          underlineFocusStyle={{ borderBottomColor: 'rgb(255, 64, 129)' }}
        />
        <i onClick={() => this.setState({ open: true })} className="material-icons help">info</i>
        <Dialog
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
          title="How to get SoundCloud Embed Link"
          titleStyle={style.title}
          style={style.dialog}
          actions={[
            <FlatButton
              label="Close"
              onTouchTap={() => this.setState({ open: false })}
            />,
          ]}
        >
          <img height="400px" alt="soundcloud-gif" src="/assets/SoundCloudHowToGetEmbed.gif" />
        </Dialog>
      </div>
    );
  }
}

export default SongInput;

