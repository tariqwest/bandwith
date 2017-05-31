import React from 'react';
// import './styles.css';

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
      instruments: [],
      genres: [],
      influences: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.send = this.send.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
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
              {/*<option selected="selected">Sex</option>*/}
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="unspecified">Unspecified</option>
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
              {/*<option selected="selected">Your instruments</option>*/}
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
              {/*<option selected="selected">Your genres</option>*/}
              <option value="rock">rock</option>
              <option value="country">country</option>
              <option value="pop">pop</option>
              <option value="punk">punk</option>
            </select>
          </p>
          <p>
            <label htmlFor="influences">Influences:</label>
            <input
              id="influences"
              type="text"
              name="influences"
              value={this.state.influences}
              onChange={this.handleChange}
            />
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

export default Signup;

