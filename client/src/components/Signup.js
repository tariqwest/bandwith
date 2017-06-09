import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { withRouter } from 'react-router';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { updateProfile } from '../actions';
import FirstNameInput from './Signup/FirstNameInput';
import LastNameInput from './Signup/LastNameInput';
import ZipCodeInput from './Signup/ZipCodeInput';
import AgeInput from './Signup/AgeInput';
import GenderInput from './Signup/GenderInput';
import BiographyTextArea from './Signup/BiographyTextArea';
import InfluencesInput from './Signup/InfluencesInput';
import SongInput from './Signup/SongInput';
import VideoInput from './Signup/VideoInput';
import SearchRadiusInput from './Signup/SearchRadiusInput';
import PopoverMenu from './Signup/PopoverMenu';

const style = {
  card: {
    boxShadow: 'none',
  },
  button: {
    margin: 12,
  },
};

const instruments = ['electric guitar', 'acoustic guitar', 'bass', 'drums', 'piano', 'vocals', 'ukulele', 'violin', 'saxophone', 'trumpet'];
const genres = ['rock', 'jazz', 'blues', 'folk', 'reggae', 'country', 'pop', 'punk', 'metal', 'edm', 'r&b', 'funk', 'rap', 'disco'];

class Signup extends React.Component {
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
    this.handleChange = this.handleChange.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleInfluences = this.handleInfluences.bind(this);
    this.handleSelectMultiple = this.handleSelectMultiple.bind(this);
    this.fillFormData = this.fillFormData.bind(this);
  }

  componentDidMount() {
    this.fillFormData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fillFormData(nextProps);
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

  send(event) {
    event.preventDefault();

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

    if (!updatedInfluences.includes(influence) && influence !== '') {
      updatedInfluences.push(influence);
      this.setState({
        influences: updatedInfluences,
        influence: '',
      });
    }
  }

  render() {
    return (
      <Row>
        <pre>{this.props.user && this.props.user.profile}</pre>
        <Col xs={12} sm={6} smOffset={3}>
          <Card style={style.card}>
            <CardHeader />
            <Paper zDepth={2}>
              <Card>
                <CardText>
                  <FirstNameInput
                    value={this.state.first}
                    onChange={this.handleChange}
                  />
                  <LastNameInput value={this.state.last} onChange={this.handleChange} />
                  <ZipCodeInput
                    value={this.state.zipcode}
                    onChange={this.handleNumberChange}
                    zipErrorText={this.state.zipcodeErrorText}
                  />
                  <AgeInput
                    value={this.state.age}
                    onChange={this.handleNumberChange}
                    ageErrorText={this.state.ageErrorText}
                  />
                  <GenderInput onChange={this.handleGender} value={this.state.gender} />
                  <BiographyTextArea
                    bio={this.state.bio}
                    onChange={this.handleChange}
                  />
                  <SongInput song={this.state.song_url} onChange={this.handleChange} /><br />
                  <VideoInput video={this.state.video_url} onChange={this.handleChange} />
                  <SearchRadiusInput
                    radius={this.state.search_radius}
                    onChange={this.handleNumberChange}
                    radiusErrorText={this.state.search_radiusErrorText}
                  />
                  <InfluencesInput
                    influence={this.state.influence}
                    influences={this.state.influences}
                    handleChange={this.handleChange}
                    onClick={this.handleInfluences}
                    handleChip={this.handleSelectMultiple}
                  /><br />
                  <PopoverMenu
                    itemName="instruments"
                    className="instruments"
                    listItems={instruments}
                    handleChip={this.handleSelectMultiple}
                    selectedItems={this.state.instruments}
                  /><br />
                  <PopoverMenu
                    className="genres"
                    itemName="genres"
                    listItems={genres}
                    handleChip={this.handleSelectMultiple}
                    selectedItems={this.state.genres}
                  /><br />
                  <PopoverMenu
                    itemName="preferred_genres"
                    className="preferred genre matches"
                    listItems={genres}
                    handleChip={this.handleSelectMultiple}
                    selectedItems={this.state.preferred_genres}
                  /><br />
                  <PopoverMenu
                    itemName="preferred_instruments"
                    className="preferred instrument matches"
                    listItems={instruments}
                    handleChip={this.handleSelectMultiple}
                    selectedItems={this.state.preferred_instruments}
                  />
                  <RaisedButton
                    secondary
                    style={style.button}
                    label="submit profile"
                    onTouchTap={this.send}
                  />
                </CardText>
              </Card>
            </Paper>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  profile: state.user.profile,
  hasUserInfo: state.user.hasInfo,
});

export default withRouter(connect(mapStateToProps)(Signup));
