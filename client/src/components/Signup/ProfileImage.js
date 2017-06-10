import React from 'react';
import Badge from 'material-ui/Badge';
import { connect } from 'react-redux';
import request from 'superagent';
import IconButton from 'material-ui/IconButton';
import Dropzone from 'react-dropzone';

const style={margin: 0}
const CLOUDINARY_UPLOAD_PRESET = 'bandwith';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dropiffy/image/upload';

class ProfileImage extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
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
      }
    });
  }

  render() {
    const { photo_src } = this.props.user;
    return (
      <div>
        <Dropzone
          style={style}
          multiple={false}
          accept="image/*"
          onDrop={this.onDrop}
        >
          <Badge
            badgeContent={
              <IconButton
                tooltip="Update Photo"
                touch
                tooltipPosition="bottom-right"
              >
                <i
                  className="material-icons"
                >mode_edit</i>
              </IconButton>
            }
          />
        </Dropzone>
        <img
          className="chat-picture"
          width="100"
          height="100"
          alt="upload pic"
          src={photo_src || '/assets/avatar.jpg'}
        />
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
