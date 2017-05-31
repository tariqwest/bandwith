import React from 'react';
import TagList from './TagList';

class MatchListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: this.props.match.photo,
      display: this.props.match.display,
      location: this.props.match.location,
    };
  }

  render() {
    return (
      <div>
        <div className="connection-pic">
          <img height="150" width="150" alt="profile-pic" src={this.state.photo} />
        </div>
        <div className="connection-info">
          <div className="connection-display">{this.state.display}</div>
          <div className="connection-locationy">{this.state.location}</div>
          <TagList tags={this.props.match.instruments} type="instrument" />
          <TagList tags={this.props.match.genres} type="genres" />
        </div>
      </div>
    );
  }
}

export default MatchListEntry;
