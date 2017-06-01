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
      instruments: {},
      genres: {},
      influences: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.send = this.send.bind(this);
    this.handleSelectMultipleInstruments = this.handleSelectMultipleInstruments.bind(this);
    this.handleSelectMultipleGenres = this.handleSelectMultipleGenres.bind(this);
    this.addInfluence = this.addInfluence.bind(this);
  }

  addInfluence() {

    // const body = {
    //   influence: this.state.influence,
    // };

    // const headers = {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    // };

    // const options = {
    //   method: 'GET',
    //   body: JSON.stringify(body),
    //   headers,
    // };

    // fetch('/api/influences', options)
    //   .then(res => res.json())
    //   .then(json => console.log(json))
    //   .catch(err => console.log(err));
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
      song: this.state.song,
      video: this.state.video,
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

  handleSelectMultipleInstruments(event) {
    const value = event.target.value;
    const selected = this.state.instruments;

    if (!selected[value]) {
      selected[value] = value;
    } else {
      delete selected[value];
    }

    this.setState({
      instruments: selected,
    });

    event.stopPropagation();
  }

  handleSelectMultipleGenres(event) {
    const value = event.target.value;
    const selected = this.state.genres;

    if (!selected[value]) {
      selected[value] = value;
    } else {
      delete selected[value];
    }

    this.setState({
      genres: selected,
    });

    event.stopPropagation();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleInfluences(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
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
          Your Gender:
          </p>
          <p>
            <label htmlFor="gender" />
            <select
              id="gender"
              name="gender"
              defaultValue="unspecified"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option value="unspecified" >Unspecified</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </p>
          <p>
            <label htmlFor="influences">
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
              Musical Influences:
            </label>
          </p>
          <p>
            <textarea
              rows="4"
              cols="50"
              id="influences"
              type="text"
              name="influences"
              placeholder="add your musical influences separated by a comma ..."
              value={this.state.value}
              onChange={this.handleChange}
            />
          </p>
          <p>
          Your instruments:
          </p>
          <p>
            <select
              multiple
              id="instruments"
              name="instruments"
              value={this.state.value}
              onChange={this.handleSelectMultipleInstruments}
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
              value={this.state.value}
              onChange={this.handleSelectMultipleGenres}
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
