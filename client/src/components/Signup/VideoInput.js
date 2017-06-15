import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const style = {
  field: { width: '95%' },
  dialog: { textAlign: 'center' },
  title: { textAlign: 'left' },
};

class VideoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <div>
        <TextField
          floatingLabelText="YouTube Video Link"
          required
          style={style.field}
          id="video_url"
          type="text"
          name="video_url"
          value={this.props.video}
          onChange={this.props.onChange}
        />
        <i onClick={() => this.setState({ open: true })} className="material-icons help">info</i>
        <Dialog
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
          title="How to get YouTube Video Link"
          titleStyle={style.title}
          style={style.dialog}
          actions={[
            <FlatButton
              label="Close"
              onTouchTap={() => this.setState({ open: false })}
            />,
          ]}
        >
          <img height="400px" alt="youtube-gif" src="/assets/YouTubeHowToGuide.gif" />
        </Dialog>
      </div>
    );
  }
}

export default VideoInput;
