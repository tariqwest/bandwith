import React from 'react';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Redirect, Route, withRouter } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { updateProfile } from '../actions';
import FirstNameInput from './Signup/FirstNameInput';
import LastNameInput from './Signup/LastNameInput';
import ZipCodeInput from './Signup/ZipCodeInput';
import AgeInput from './Signup/AgeInput';
import GenderInput from './Signup/GenderInput';
import BiographyTextArea from './Signup/BiographyTextArea';
import InfluencesInput from './Signup/InfluencesInput';
import UserInstrumentsInput from './Signup/UserInstrumentsInput';
import UserGenresInput from './Signup/UserGenresInput';
import SongInput from './Signup/SongInput';
import VideoInput from './Signup/VideoInput';
import SearchRadiusInput from './Signup/SearchRadiusInput';
import PreferredInstrumentsInput from './Signup/PreferredInstrumentsInput';
import PreferredGenresInput from './Signup/PreferredGenresInput';

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
      zipCodeErrorText: '',
      ageErrorText: '',
      searchRadiusErrorText: '',
      instrument: '',
      instruments: {},
      genres: {},
      influence: '',
      influences: {},
      preferred_instruments: {},
      preferred_genres: {},
    };
    this.send = this.send.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleInfluences = this.handleInfluences.bind(this);
    this.handleSelectMultiple = this.handleSelectMultiple.bind(this);
  }

  // componentWillUpdate() {
  //   console.log('component will update');
  //   // if (!isFetching && hasSaved) {
  //   //   history.push('/profile');
  //   // }
  // }

  send(event) {
    event.preventDefault();

    const { dispatch, history } = this.props;

    const profile = {
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

    this.setState({
      first: '',
      last: '',
      gender: '',
      bio: '',
      influence: '',
      song: '',
      video: '',
      zipCode: '',
      age: '',
      searchRadius: '',
      instruments: {},
      genres: {},
      influences: {},
      preferred_instruments: {},
      preferred_genres: {},
    });

    dispatch(updateProfile(profile));
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

  handleGender(event, index, value) {
    this.setState({
      gender: value,
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  handleNumberChange(event) {
    const target = event.target;
    const value = target.value;
    const name = event.target.name;
    const key = `${name}ErrorText`;
    const errorMessage = `${target.dataset.name} must be a number`;

    if (!Number.isInteger(Number(value))) {
      this.setState({
        [key]: errorMessage,
      });
    } else {
      this.setState({
        [name]: value,
        [key]: '',
      });
    }
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
      <Row>
        <Col xs={12}>
          <Row center="xs">
            <Card>
              <form onSubmit={this.send}>
                <Paper
                  zDepth={2}
                >
                  <Card>
                    <CardHeader
                      title="Profile"
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText>
                      <FirstNameInput value={this.state.first} onChange={this.handleChange} /><br />
                      <LastNameInput value={this.state.last} onChange={this.handleChange} /><br />
                      <ZipCodeInput
                        value={this.state.zipCode}
                        onChange={this.handleNumberChange}
                        zipErrorText={this.state.zipCodeErrorText}
                      /><br />
                      <AgeInput
                        value={this.state.age}
                        onChange={this.handleNumberChange}
                        ageErrorText={this.state.ageErrorText}
                      /><br />
                      <GenderInput onChange={this.handleGender} value={this.state.gender} /><br />
                      <BiographyTextArea bio={this.state.bio} onChange={this.handleChange} /><br />
                      <InfluencesInput
                        influence={this.state.influence}
                        influences={this.state.influences}
                        handleChange={this.handleChange}
                        onClick={this.handleInfluences}
                      /><br />
                      <UserInstrumentsInput
                        instruments={this.state.instruments}
                        instrument={this.state.instrument}
                        onChange={this.handleSelectMultiple}
                      /><br />
                      <UserGenresInput
                        onChange={this.handleSelectMultiple}
                        genres={this.state.genres}
                      /><br />
                      <SongInput song={this.state.song} onChange={this.handleChange} /><br />
                      <VideoInput video={this.state.video} onChange={this.handleChange} /><br />
                      <SearchRadiusInput
                        radius={this.state.searchRadius}
                        onChange={this.handleNumberChange}
                        radiusErrorText={this.state.searchRadiusErrorText}
                      /><br />
                      <PreferredGenresInput
                        genres={this.state.preferred_genres}
                        onChange={this.handleSelectMultiple}
                      /><br />
                      <PreferredInstrumentsInput
                        instruments={this.state.preferred_instruments}
                        onChange={this.handleSelectMultiple}
                      /><br />
                      <p>
                        <input type="submit" value="Submit" />
                      </p>
                    </CardText>
                  </Card>
                </Paper>
              </form>
            </Card>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => (
  { userId: state.auth.userId }
);

export default withRouter(connect(mapStateToProps)(Signup));
