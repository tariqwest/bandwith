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
      instruments: [],
      genres: [],
      influences: [],
      song: '',
      video: '',
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
      song: this.state.song,
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

    fetch('/profile', options)
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
            <label htmlFor="sex" />
            <select
              id="sex"
              name="sex"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="unspecified">Unspecified</option>
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

export default Signup;

