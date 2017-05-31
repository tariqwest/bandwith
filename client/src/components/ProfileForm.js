import React from 'react';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      song: '',
      sex: '',
      type: [],
      genre: [],
      bio: '',
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
      <form onSubmit={this.send}>
        <label htmlFor="first">
          First Name:
        </label>
        <input
          id="first"
          type="text"
          value={this.state.first}
          onChange={this.handleChange}
        />

        <label htmlFor="last">Last Name:</label>
        <input id="last" type="text" value={this.state.last} onChange={this.handleChange} />

        <textarea
          rows="4"
          cols="50"
          id="bio"
          type="text"
          value={this.state.bio}
          onChange={this.handleChange}
        >
          Write a brief description of yourself
        </textarea>

        <label htmlFor="sex" />
        <select id="sex" value={this.state.value} onChange={this.handleChange}>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="unspecified">Unspecified</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ProfileForm;

