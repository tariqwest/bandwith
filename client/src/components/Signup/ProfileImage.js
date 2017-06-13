/* eslint-disable camelcase */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import request from 'superagent';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';

const styles = {
  parent: {
    position: 'relative',
    width: '100%',
    textAlign: 'center',
  },
  child: {
    position: 'relative',
    top: '-50px',
  },
  icon: {
    color: 'white',
  },
};
const CLOUDINARY_UPLOAD_PRESET = 'bandwith';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/hjwsarwnv/image/upload';

class ProfileImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cloudinaryUrlLrg: '',
      cloudinaryUrlSml: '',
      currentPhoto: this.props.user.photo_src_small,
      largeImage: this.props.user.photo_src_large,
      croppedPhoto: '',
      showEditPhoto: false,
    };
    this.onDrop = this.onDrop.bind(this);
    this.closeDropZone = this.closeDropZone.bind(this);
    this.imageCrop = this.imageCrop.bind(this);
    this.savePhoto = this.savePhoto.bind(this);
  }

  onDrop(photo) {
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', photo);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          cloudinaryUrlLrg: response.body.secure_url,
          largeImage: response.body.secure_url,
        });
      }
    });
  }

  closeDropZone() {
    this.setState({
      showEditPhoto: false,
    });
  }

  imageCrop() {
    this.setState({
      croppedPhoto: this.refs.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  savePhoto() {
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', this.state.croppedPhoto);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          cloudinaryUrlSml: response.body.secure_url,
          currentPhoto: response.body.secure_url,
          showEditPhoto: false,
        });

        this.props.handlePhotoChange(this.state.cloudinaryUrlLrg, this.state.cloudinaryUrlSml);
      }
    });
  }

  render() {
    return (
      <div style={styles.parent}>
        <img
          className="chat-picture"
          width="100"
          height="100"
          alt="upload pic"
          src={this.state.currentPhoto || '/assets/avatar.jpg'}
        />
        <FloatingActionButton
          style={{ marginLeft: '-30px' }}
          zDepth={1}
          className="edit-button"
          onClick={() => this.setState({ showEditPhoto: true })}
          mini
          backgroundColor="white"
          iconStyle={{ color: 'black' }}
        >
          <i className="material-icons">create</i>
        </FloatingActionButton>

        <Dialog
          open={this.state.showEditPhoto}
          onRequestClose={() => this.setState({ showEditPhoto: false })}
          title="Update Profile Picture"
          actions={[
            <FlatButton
              label="Close"
              onTouchTap={() => this.setState({ showEditPhoto: false })}
            />,
            <Dropzone
              style={style}
              multiple={false}
              accept="image/*"
              onDrop={this.onDrop}
            >
              <FlatButton label="Upload Image" />
            </Dropzone>,
            <FlatButton
              label="Save"
              onTouchTap={this.savePhoto}
            />,
          ]}
        >
          <Cropper
            ref="cropper"
            src={this.state.largeImage}
            style={{ height: '400px', width: '100%' }}
            aspectRatio={16 / 16}
            crop={this.imageCrop}
          />
        </Dialog>
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
