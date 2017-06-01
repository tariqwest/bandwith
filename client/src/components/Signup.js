import React from 'react';
import { connect } from 'react-redux';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      sex: '',
      bio: '',
      song: '',
      video: '',
      instruments: [
        { value: 'guitar', label: 'guitar' },
        { value: 'drums', label: 'drums' },
        { value: 'piano', label: 'piano' },
        { value: 'bass', label: 'bass' },
      ],
      genres: [],
      influences: [],
      test: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.send = this.send.bind(this);
    this.handleInstrumentChange = this.handleInstrumentChange.bind(this);
  }

  getArtWork() {
    const body = {
      influence: this.state.influence,
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const options = {
      method: 'GET',
      body: JSON.stringify(body),
      headers,
    };

    fetch('/api/influences', options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
  }

  send() {
    const body = {
      first: this.state.first,
      last: this.state.last,
      sex: this.state.sex,
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
  handleInstrumentChange(event) {
    const value = event[0].value;
    const selected = this.state.instruments;
    selected.push(value);

    this.setState({
      instruments: selected,
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
          Your Sex:
          </p>
          <p>
            <label htmlFor="sex" />
            <select
              id="sex"
              name="sex"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option value="unspecified" selected>Unspecified</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
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
              onChange={this.handleChange}
            >
              <option value="guitar">guitar</option>
              <option value="drums">drums</option>
              <option value="bass">bass</option>
              <option value="piano">piano</option>
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
              onChange={this.handleChange}
            >
              <option value="rock">rock</option>
              <option value="country">country</option>
              <option value="pop">pop</option>
              <option value="punk">punk</option>
            </select>
          </p>
          <p>
            <form onSubmit={this.getArtWork}>
              <label htmlFor="influences">Influences:</label>
              <input
                id="influences"
                type="text"
                name="influences"
                value={this.state.influences}
                onChange={this.handleChange}
              />
            </form>
            <input type="submit" value="Submit Influence" />
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

