import React from 'react';
import { connect } from 'react-redux';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import FlatButton from 'material-ui/FlatButton';
import DropZone from './DropZone';

class ProfileImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditPhoto: false,
    };

    this.closeDropZone = this.closeDropZone.bind(this);
  }

  closeDropZone() {
    this.setState({
      showEditPhoto: false,
    });
  }

  render() {
    const { photo_src } = this.props.user;
    return (
      <div>
        <img
          className="chat-picture"
          width="100"
          height="100"
          alt="profile-pic"
          src={photo_src}
        />
        <i
          onClick={() => this.setState({ showEditPhoto: true })}
          className="material-icons"
        >mode_edit</i>

        <FullscreenDialog
          open={this.state.showEditPhoto}
          onRequestClose={() => this.setState({ showEditPhoto: false })}
          title={this.props.user.display}
          actionButton={<FlatButton
            label="Close"
            onTouchTap={() => this.setState({ showEditPhoto: false })}
          />}
          appBarStyle={{ backgroundColor: '#000000' }}
        >
          <DropZone
            handlePhotoChange={this.props.handlePhotoChange}
            closeDropZone={this.closeDropZone}
          />
        </FullscreenDialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.profile,
  hasInfo: state.user.hasInfo,
  location: state.location,
});

export default connect(mapStateToProps)(ProfileImage);
