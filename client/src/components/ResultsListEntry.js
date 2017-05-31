import React from 'react';
import TagList from './TagList';

class ResultsListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: this.props.result.photo,
      first: this.props.result.first,
      last: this.props.result.last,
      display: this.props.result.display,
      location: this.props.result.location,
      bio: this.props.result.bio,
      gender: this.props.result.gender,
      video: this.props.result.video,
      audio: this.props.result.songs,
    };
  }

  render() {
    return (
      <div>
        <div className="profile-main">
          <img height="150" width="150" alt="profile-pic" src={this.state.photo} />
          <div className="profile-display">{this.state.display}</div>
          <div className="profile-bio">{this.state.bio}</div>
          <TagList tags={this.props.result.instruments} type="instrument" />
          <TagList tags={this.props.result.genres} type="genres" />
          <TagList tags={this.props.result.influences} type="influences" />
        </div>
        <div className="profile-media">
          <div className="profile-audio">
            <iframe
              width="400"
              height="100"
              scrolling="no"
              frameBorder="no"
              title="audio"
              src={this.state.audio}
            />
          </div>
          <div className="profile-video">
            <iframe
              width="560"
              height="315"
              frameBorder="0"
              allowFullScreen
              title="video"
              src={this.state.video}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ResultsListEntry;
