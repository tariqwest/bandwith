import React from 'react';

class MatchListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: this.props.match.photo_src,
      display: this.props.match.display,
      location: this.props.match.zipCode,
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
        </div>
      </div>
    );
  }
}

export default MatchListEntry;
