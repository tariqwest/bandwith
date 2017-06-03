import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TagList from './TagList';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: 'John',
      last: 'Lennon',
      display: 'johnlennon',
      bio: 'I started the beatles...',
      email: 'john@lennon.com',
      phone: '415 234 5678',
      gender: 'Male',
      zipCode: '94131',
      age: 40,
      searchRadius: 5,
      photo_src: 'http://www.phrases.org.uk/quotes/last-words/images/john-lennon.jpg',
      song_url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/251343373',
      video_url: 'https://www.youtube.com/embed/DVg2EJvvlF8',
      instruments: ['vocals', 'acoustic guitar'],
      genres: ['rock'],
      influences: ['Kanye', 'Jay Z'],
      preferred_instruments: ['ukulele', 'drums'],
      preferred_genres: ['punk', 'funk'],
    };
  }

  render() {
    return (
      <div>
        <Link to="/signup">Edit</Link>
        <br />
        <img height="150" width="150" src={this.state.photo_src} alt="profile-pic" />
        <div>Display Name: {this.state.display}</div>
        <div>Name: {this.state.first} {this.state.last}</div>
        <div>Biography: {this.state.bio}</div>
        <div>Email: {this.state.email}</div>
        <div>Phone: {this.state.phone}</div>
        <div>Gender: {this.state.gender}</div>
        <div>Zip Code: {this.state.zipCode}</div>
        <div>Search Radius: {this.state.searchRadius} miles</div>
        <div>My Instruments: </div>
        <TagList tags={this.state.instruments} type="instrument" />
        <div>My Genres: </div>
        <TagList tags={this.state.genres} type="genres" />
        <div>My Musical Influences: </div>
        <TagList tags={this.state.influences} type="influences" />
        <div>Looking for musicians who play: </div>
        <TagList tags={this.state.preferred_instruments} type="preferred-instruments" />
        <div>Looking for musicians into: </div>
        <TagList tags={this.state.preferred_genres} type="preferred-genres" />
        <div>SoundCloud: </div>
        <div className="profile-audio">
          <iframe
            width="400"
            height="100"
            scrolling="no"
            frameBorder="no"
            title="audio"
            src={this.state.song_url}
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
            src={this.state.video_url}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.userId }); // change this to getting user info

export default connect(mapStateToProps)(Profile);
