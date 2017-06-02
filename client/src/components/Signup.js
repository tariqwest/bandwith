import React from 'react';
import { connect } from 'react-redux';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      zipCode: '',
      gender: '',
      bio: '',
      song: '',
      video: '',
      age: '',
      searchRadius: '',
      instruments: {},
      genres: {},
      influence: '',
      influences: {},
      preferred_instruments: {},
      preferred_genres: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.send = this.send.bind(this);
    this.handleSelectMultiple = this.handleSelectMultiple.bind(this);
    this.handleInfluences = this.handleInfluences.bind(this);
  }

  send() {
    const body = {
      first: this.state.first,
      last: this.state.last,
      gender: this.state.gender,
      bio: this.state.bio,
      instruments: this.state.instruments,
      genres: this.state.genres,
      influences: this.state.influences,
      song_url: this.state.song,
      video_url: this.state.video,
      zipCode: this.state.zipCode,
      id: this.props.userId,
      age: this.state.age,
      searchRadius: this.state.searchRadius,
      preferred_instruments: this.state.preferred_instruments,
      preferred_genres: this.state.preferred_genres,
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    };

    fetch('/api/signup', options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
  }

  handleSelectMultiple(event) {
    const name = event.target.name;
    const value = event.target.value;
    const selected = this.state[name];

    if (!selected[value]) {
      selected[value] = value;
    } else {
      delete selected[value];
    }

    this.setState({
      [name]: selected,
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleInfluences() {
    const influence = this.state.influence;
    const updatedInfluences = this.state.influences;

    if (!updatedInfluences[influence]) {
      updatedInfluences[influence] = influence;
      this.setState({
        influences: updatedInfluences,
        influence: '',
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.send}>
          <p>
            <label htmlFor="first">
              First Name:
            </label>
            <input
              id="first"
              type="text"
              name="first"
              value={this.state.first}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <label htmlFor="last">Last Name:</label>
            <input
              id="last"
              type="text"
              name="last"
              value={this.state.last}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <label htmlFor="zipCode">
              Zip Code:
            </label>
            <input
              id="zipCode"
              type="text"
              name="zipCode"
              value={this.state.zipCode}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <label htmlFor="age">
              How old are you?
            </label>
            <input
              id="age"
              type="text"
              name="age"
              value={this.state.age}
              onChange={this.handleChange}
            />
          </p>
          <p>
          Your Gender:
          </p>
          <p>
            <label htmlFor="gender" />
            <select
              id="gender"
              name="gender"
              defaultValue="unspecified"
              onChange={this.handleChange}
            >
              <option value="unspecified" >Unspecified</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </p>
          <p>
            <label htmlFor="bio">
              Biography:
            </label>
          </p>
          <p>
            <textarea
              rows="4"
              cols="50"
              id="bio"
              type="text"
              name="bio"
              placeholder="tell us about yourself ..."
              value={this.state.bio}
              onChange={this.handleChange}
            >
              Write a brief description of yourself
            </textarea>
          </p>
          <p>
            <label htmlFor="influences">
              Add a musical influences:
            </label>
            <input
              id="influence"
              type="text"
              name="influence"
              value={this.state.influence}
              onChange={this.handleChange}
            />
            <button type="button" form="influences" name="influences" onClick={this.handleInfluences} >
              Add Influence
            </button>
          </p>
          <p>
          Your instruments:
          </p>
          <p>
            <select
              multiple
              id="instruments"
              name="instruments"
              onChange={this.handleSelectMultiple}
            >
              <option value="electricGuitar">electric guitar</option>
              <option value="acousticGuitar">acoustic guitar</option>
              <option value="bass">bass</option>
              <option value="drums">drums</option>
              <option value="piano">piano</option>
              <option value="vocals">vocals</option>
              <option value="ukulele">ukulele</option>
              <option value="violin">violin</option>
              <option value="saxaphone">saxaphone</option>
              <option value="trumpet">trumpet</option>
              <option value="didgeridoo">didgeridoo</option>
            </select>
          </p>
          <p>
          Your Genres:
          </p>
          <p>
            <select
              multiple
              id="genres"
              name="genres"
              onChange={this.handleSelectMultiple}
            >
              <option value="rock">rock</option>
              <option value="jazz">jazz</option>
              <option value="blues">blues</option>
              <option value="folk">folk</option>
              <option value="reggae">reggae</option>
              <option value="country">country</option>
              <option value="pop">pop</option>
              <option value="punk">punk</option>
              <option value="metal">metal</option>
              <option value="edm">edm</option>
              <option value="r&b">r&b</option>
              <option value="funk">funk</option>
              <option value="rap">rap</option>
              <option value="disco">disco</option>
              <option value="pop">pop</option>
            </select>
          </p>
          <p>
            <label htmlFor="song">SoundCloud Demo Link:</label>
            <input
              id="song"
              type="text"
              name="song"
              value={this.state.song}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <label htmlFor="video">YouTube Video Link:</label>
            <input
              id="video"
              type="text"
              name="video"
              value={this.state.video}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <label htmlFor="searchRadius">Im looking for musicians within this many miles:</label>
            <input
              id="searchRadius"
              type="text"
              name="searchRadius"
              value={this.state.searchRadius}
              onChange={this.handleChange}
            />
          </p>
          <p>
            Im looking for musicians that play:
          </p>
          <p>
            <select
              multiple
              id="preferred_instruments"
              name="preferred_instruments"
              onChange={this.handleSelectMultiple}
            >
              <option value="electricGuitar">electric guitar</option>
              <option value="acousticGuitar">acoustic guitar</option>
              <option value="bass">bass</option>
              <option value="drums">drums</option>
              <option value="piano">piano</option>
              <option value="vocals">vocals</option>
              <option value="ukulele">ukulele</option>
              <option value="violin">violin</option>
              <option value="saxaphone">saxaphone</option>
              <option value="trumpet">trumpet</option>
              <option value="didgeridoo">didgeridoo</option>
            </select>
          </p>
          <p>
            Im looking for musicians that like:
          </p>
          <p>
            <select
              multiple
              id="preferred_genres"
              name="preferred_genres"
              onChange={this.handleSelectMultiple}
            >
              <option value="rock">rock</option>
              <option value="jazz">jazz</option>
              <option value="blues">blues</option>
              <option value="folk">folk</option>
              <option value="reggae">reggae</option>
              <option value="country">country</option>
              <option value="pop">pop</option>
              <option value="punk">punk</option>
              <option value="metal">metal</option>
              <option value="edm">edm</option>
              <option value="r&b">r&b</option>
              <option value="funk">funk</option>
              <option value="rap">rap</option>
              <option value="disco">disco</option>
              <option value="pop">pop</option>
            </select>
          </p>
          <p>
            <input type="submit" value="Submit" />
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => (
  { userId: state.auth.userId }
);

export default connect(mapStateToProps)(Signup);
