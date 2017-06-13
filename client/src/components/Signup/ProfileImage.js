/* eslint-disable camelcase */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import request from 'superagent';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';

const styles = {
  imageContainer: {
    position: 'relative',
    width: '100%',
    textAlign: 'center',
  },
  uploadImageButton: {
    color: 'black',
    margin: '2px 0px 12px 0px',
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
    Promise.resolve(this.imageCrop())
      .then(() => {
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
      });
  }

  render() {
    return (
      <div style={styles.imageContainer}>
        <div id="container">
          <div id="base">
            <img
              alt="upload pic"
              className="chat-picture"
              height="100"
              width="100"
              src={this.state.currentPhoto || '/assets/avatar.jpg'}
            />
          </div>
          <IconButton
            onClick={() => this.setState({ showEditPhoto: true })}
            id="overlay"
          >
            <FontIcon className="material-icons" color="white">photo_camera</FontIcon>
          </IconButton>
        </div>
        <Dialog
          open={this.state.showEditPhoto}
          onRequestClose={() => this.setState({ showEditPhoto: false })}
          title="Update Profile Picture"
          actions={[
            <FlatButton
              label="Close"
              onTouchTap={() => this.setState({ showEditPhoto: false })}
            />,
            <FlatButton
              label="Save"
              onTouchTap={this.savePhoto}
            />,
          ]}
        >
          <Dropzone
              style={styles}
              multiple={false}
              accept="image/*"
              onDrop={this.onDrop}
          >
            <RaisedButton
              icon={<FontIcon className="material-icons">add_a_photo</FontIcon>}
              fullWidth
              onClick={() => this.setState({ showEditPhoto: true })}
              style={styles.uploadImageButton}
            />
          </Dropzone>
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
