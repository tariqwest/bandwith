import React from 'react';
import TagList from './TagList';

class ResultsListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="profile-main">
          <img height="150" width="150" alt="profile-pic" src={this.props.result.photo} />
          <div className="profile-display">{this.props.result.display}</div>
          <div className="profile-bio">{this.props.result.bio}</div>
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
              src={this.props.result.song}
            />
          </div>
          <div className="profile-video">
            <iframe
              width="560"
              height="315"
              frameBorder="0"
              allowFullScreen
              title="video"
              src={this.props.result.video}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ResultsListEntry;
