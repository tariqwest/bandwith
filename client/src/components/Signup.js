import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { withRouter } from 'react-router';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateProfile } from '../actions';
import AgeInput from './Signup/AgeInput';
import SongInput from './Signup/SongInput';
import VideoInput from './Signup/VideoInput';
import GenderInput from './Signup/GenderInput';
import PopoverMenu from './Signup/PopoverMenu';
import ProfileImage from './Signup/ProfileImage';
import ZipCodeInput from './Signup/ZipCodeInput';
import LastNameInput from './Signup/LastNameInput';
import FirstNameInput from './Signup/FirstNameInput';
import InfluencesInput from './Signup/InfluencesInput';
import SearchRadiusInput from './Signup/SearchRadiusInput';
import BiographyTextArea from './Signup/BiographyTextArea';

const style = {
  marginTop: 8,
  marginBottom: 8,
};

const instruments = ['electric guitar', 'acoustic guitar', 'bass', 'drums', 'piano', 'vocals', 'ukulele', 'violin', 'saxophone', 'trumpet'];
const genres = ['rock', 'jazz', 'blues', 'folk', 'reggae', 'country', 'pop', 'punk', 'metal', 'edm', 'r&b', 'funk', 'rap', 'disco'];

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      zipcode: '',
      gender: '',
      bio: '',
      song_url: '',
      video_url: '',
      photo_src_large: '',
      photo_src_small: '',
      age: '',
      search_radius: '',
      zipcodeErrorText: '',
      ageErrorText: '',
      search_radiusErrorText: '',
      instrument: '',
      instruments: [],
      genres: [],
      influence: '',
      influences: [],
      preferred_instruments: [],
      preferred_genres: [],
    };
    this.send = this.send.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleSearchRadius = this.handleSearchRadius.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleInfluences = this.handleInfluences.bind(this);
    this.handleSelectMultiple = this.handleSelectMultiple.bind(this);
    this.handleRemoveInfluence = this.handleRemoveInfluence.bind(this);
    this.fillFormData = this.fillFormData.bind(this);
  }

  componentDidMount() {
    this.fillFormData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fillFormData(nextProps);
  }

  componentWillUnmount() {
    this.send();
  }

  fillFormData(props) {
    if (props.hasUserInfo) {
      const { profile } = props;
      const keys = Object.keys(profile);

      keys.forEach((key) => {
        if (profile[key] === null) {
          profile[key] = '';
        }
      });
      this.setState({ ...profile });
    }
  }

  send() {
    const { dispatch } = this.props;

    const profile = {
      first: this.state.first,
      last: this.state.last,
      gender: this.state.gender,
      bio: this.state.bio,
      instruments: this.state.instruments,
      genres: this.state.genres,
      influences: this.state.influences,
      song_url: this.state.song_url,
      video_url: this.state.video_url,
      zipcode: this.state.zipcode,
      photo_src_large: this.state.photo_src_large,
      photo_src_small: this.state.photo_src_small,
      id: this.props.userId,
      age: this.state.age,
      search_radius: this.state.search_radius,
      preferred_instruments: this.state.preferred_instruments,
      preferred_genres: this.state.preferred_genres,
    };

    this.setState({
      first: '',
      last: '',
      gender: '',
      bio: '',
      influence: '',
      song_url: '',
      video_url: '',
      zipcode: '',
      photo_src_large: '',
      photo_src_small: '',
      age: '',
      search_radius: '',
      instruments: [],
      genres: [],
      influences: [],
      preferred_instruments: [],
      preferred_genres: [],
    });

    dispatch(updateProfile(profile));
  }

  handlePhotoChange(urlLrg, urlSml) {
    this.setState({
      photo_src_large: urlLrg,
      photo_src_small: urlSml,
    });
  }

  handleSelectMultiple(item, collection) {
    const selected = this.state[collection];

    if (!selected.includes(item)) {
      selected.push(item);
    } else {
      selected.forEach((ele, i) => {
        if (item === ele) {
          selected.splice(i, 1);
        }
      });
    }

    this.setState({
      [collection]: selected,
    });
  }

  handleRemoveInfluence(item) {
    const influencesList = this.state.influences;
    for (let i = 0; i < influencesList.length; i++) {
      if (influencesList[i].name === item) {
        influencesList.splice(i, 1);
      }
    }
    this.setState({ influences: influencesList });
  }

  handleGender(event, index, value) {
    this.setState({
      gender: value,
    });
  }

  handleSearchRadius(event, value) {
    this.setState({
      search_radius: Math.floor(value * 100),
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

    if (!updatedInfluences.includes(influence) && influence !== '') {
      const influenceURI = encodeURI(influence);
      axios.get(`https://rest.bandsintown.com/artists/${influenceURI}?app_id=bandwith`)
        .then((response) => {
          const influencesObj = {
            name: response.data.name,
            img: response.data.thumb_url,
          };
          updatedInfluences.push(influencesObj);
          this.setState({
            influences: updatedInfluences,
            influence: '',
          });
          return influencesObj;
        })
        .then((influencesObj) => {
          axios.post('/api/influence', influencesObj);
        })
        .catch((err) => { throw err; });
    }
  }

  render() {
    return (
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <Paper style={style}>
            <Card>
              <CardText>
                <Row>
                  <Col xs={12}>
                    <ProfileImage
                      handlePhotoChange={this.handlePhotoChange}
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <FirstNameInput
                      value={this.state.first}
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <LastNameInput value={this.state.last} onChange={this.handleChange} />
                  </Col>
                  <Col xs={12} sm={4}>
                    <AgeInput
                      value={this.state.age}
                      onChange={this.handleNumberChange}
                      ageErrorText={this.state.ageErrorText}
                    />
                  </Col>
                  <Col xs={12} sm={4}>
                    <GenderInput onChange={this.handleGender} value={this.state.gender} />
                  </Col>
                  <Col xs={12} sm={4}>
                    <ZipCodeInput
                      value={this.state.zipcode}
                      onChange={this.handleNumberChange}
                      zipErrorText={this.state.zipcodeErrorText}
                    />
                  </Col>
                  <Col xs={12}>
                    <BiographyTextArea
                      bio={this.state.bio}
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
              </CardText>
            </Card>
          </Paper>
          <Paper style={style}>
            <Card>
              <CardTitle title="Your sounds" />
              <CardText>
                <SongInput song={this.state.song_url} onChange={this.handleChange} /><br />
                <VideoInput video={this.state.video_url} onChange={this.handleChange} />
              </CardText>
            </Card>
          </Paper>
          <Paper style={style}>
            <Card>
              <CardTitle title="Your inspirations" />
              <CardText>
                <InfluencesInput
                  influence={this.state.influence}
                  influences={this.state.influences}
                  handleChange={this.handleChange}
                  onClick={this.handleInfluences}
                  handleChip={this.handleRemoveInfluence}
                /><br />
                <Divider />
                <PopoverMenu
                  style={style}
                  itemName="instruments"
                  className="instruments"
                  listItems={instruments}
                  handleChip={this.handleSelectMultiple}
                  selectedItems={this.state.instruments}
                /><br />
                <Divider />
                <PopoverMenu
                  style={style}
                  className="genres"
                  itemName="genres"
                  listItems={genres}
                  handleChip={this.handleSelectMultiple}
                  selectedItems={this.state.genres}
                /><br />
              </CardText>
            </Card>
          </Paper>
          <Paper style={style}>
            <Card>
              <CardTitle title="Your discovery prefs" />
              <CardText>
                <SearchRadiusInput
                  radius={this.state.search_radius}
                  onChange={this.handleSearchRadius}
                  radiusErrorText={this.state.search_radiusErrorText}
                />
                <Divider />
                <PopoverMenu
                  itemName="preferred_genres"
                  className="preferred genre matches"
                  listItems={genres}
                  handleChip={this.handleSelectMultiple}
                  selectedItems={this.state.preferred_genres}
                /><br />
                <Divider />
                <PopoverMenu
                  itemName="preferred_instruments"
                  className="preferred instrument matches"
                  listItems={instruments}
                  handleChip={this.handleSelectMultiple}
                  selectedItems={this.state.preferred_instruments}
                />
              </CardText>
            </Card>
          </Paper>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  profile: state.user.profile,
  hasUserInfo: state.user.hasInfo,
  influenceInfo: state.influence,
});

export default withRouter(connect(mapStateToProps)(Signup));
