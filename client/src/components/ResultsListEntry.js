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
    return (
      <div>
        <Card>
          <div onClick={() => this.setState({ showFullProfile: true })}>
          <CardMedia
            overlay={
              <div>
                <CardTitle title={this.props.result.display} subtitle={this.props.result.bio} />
                <TagList tags={this.props.result.instruments} type="instrument" />
                <TagList tags={this.props.result.genres} type="genres" />
              </div>}
          >
            <img src={this.props.result.photo || '/assets/avatar.jpg'} />
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
          title={this.props.result.display}
          actionButton={<FlatButton
            label='Close'
            onTouchTap={() => this.setState({ showFullProfile: false })}
          />}
        >
          <CardActions>
            <FlatButton label="Yes" onClick={() => this.handleChoice(true)} />
            <FlatButton label="No" onClick={() => this.handleChoice(true)} />
          </CardActions>
          <ResultsProfile user={this.props.result} />
        </FullscreenDialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({ userId: state.auth.userId });

export default connect(mapStateToProps)(ResultsListEntry);
