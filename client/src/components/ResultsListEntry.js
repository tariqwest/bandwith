import React from 'react';
import TagList from './TagList';
import { sendResultsAction } from '../actions';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import ResultsProfile from './ResultsProfile';


class ResultsListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullProfile: false,
    };

    this.handleChoice = this.handleChoice.bind(this);
  }

  handleChoice(choice) {
    const { dispatch, userId, result } = this.props;
    dispatch(sendResultsAction(choice, userId, result.id));
  }

  render() {
    const {
      first,
      last,
      display,
      bio,
      photo_src,
      instruments,
      genres,
    } = this.props.result;
    const fullname = `${first} ${last}`;

    return (
      <div>
        <Card>
          <div onClick={() => this.setState({ showFullProfile: true })}>
          <CardMedia
            overlay={
              <div>
                <CardTitle title={fullname} subtitle={this.props.result.bio} />
                <TagList tags={instruments} type="instrument" />
                <TagList tags={genres} type="genres" />
              </div>}
          >
            <img src={photo_src || '/assets/avatar.jpg'} />
          </CardMedia>
          </div>
          <CardActions>
            <FlatButton label="Yes" onClick={() => this.handleChoice(true)} />
            <FlatButton label="No" onClick={() => this.handleChoice(false)} />
          </CardActions>
        </Card>
        <FullscreenDialog
          open={this.state.showFullProfile}
          onRequestClose={() => this.setState({ showFullProfile: false })}
          title={display}
          actionButton={<FlatButton
            label='Close'
            onTouchTap={() => this.setState({ showFullProfile: false })}
          />}
          appBarStyle={{backgroundColor: '#000000'}}
        >
          <CardActions>
            <FlatButton label="Yes" onClick={() => this.handleChoice(true)} />
            <FlatButton label="No" onClick={() => this.handleChoice(true)} />
          </CardActions>
          <Card>
            <CardTitle title={fullname} subtitle={bio} />
              <ResultsProfile currentResult={this.props.result} />
            </Card>
        </FullscreenDialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  user: state.user.profile,
});

export default connect(mapStateToProps)(ResultsListEntry);
