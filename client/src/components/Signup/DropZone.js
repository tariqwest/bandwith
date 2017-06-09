import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'bandwith';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dropiffy/image/upload';

class DropZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cloudinaryUrl: '',
    };

    this.onDrop = this.onDrop.bind(this);
    // this.dragEnter = this.dragEnter.bind(this);
    // this.dragLeave = this.dragLeave.bind(this);
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
          cloudinaryUrl: response.body.secure_url,
        });

        this.props.handlePhotoChange(this.state.cloudinaryUrl);
        this.props.closeDropZone();
      }
    });
  }

  render() {
    return (
      <div>
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onDrop}
        />
      </div>
    );
  }
}

export default DropZone;
