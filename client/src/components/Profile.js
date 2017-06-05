import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

import TagList from './TagList';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.hasInfo) {
      return (
        <div>
          <FlatButton label="Edit" containerElement={<Link to="/signup" />} />
          <br />
          <img height="150" width="150" src={this.props.user.photo_src} alt="profile-pic" />
          <div>Display Name: {this.props.user.display}</div>
          <div>Name: {this.props.user.first} {this.props.user.last}</div>
          <div>Biography: {this.props.user.bio}</div>
          <div>Email: {this.props.user.email}</div>
          <div>Phone: {this.props.user.phone}</div>
          <div>Gender: {this.props.user.gender}</div>
          <div>Zip Code: {this.props.user.zipCode}</div>
          <div>Search Radius: {this.props.user.searchRadius} miles</div>
          <div>My Instruments: </div>
          <TagList tags={this.props.user.instruments} type="instrument" />
          <div>My Genres: </div>
          <TagList tags={this.props.user.genres} type="genres" />
          <div>My Musical Influences: </div>
          <TagList tags={this.props.user.influences} type="influences" />
          <div>Looking for musicians who play: </div>
          <TagList tags={this.props.user.preferredInstruments} type="preferred-instruments" />
          <div>Looking for musicians into: </div>
          <TagList tags={this.props.user.preferredGenres} type="preferred-genres" />
          <div>SoundCloud: </div>
          <div className="profile-audio">
            <iframe
              width="400"
              height="100"
              scrolling="no"
              frameBorder="no"
              title="audio"
              src={this.props.user.song_url}
            />
          </div>
          <div>YouTube: </div>
          <div className="profile-video">
            <iframe
              width="560"
              height="315"
              frameBorder="0"
              allowFullScreen
              title="video"
              src={this.props.user.video_url}
            />
          </div>
        </div>
      );
    }
    return (
      <div>Loading</div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.profile,
  hasInfo: state.user.hasInfo,
});

export default connect(mapStateToProps)(Profile);
