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

    this.clickNo = this.clickNo.bind(this);
    this.clickYes = this.clickYes.bind(this);
  }

  clickNo() {
    console.log('Click no...');
    const { dispatch } = this.props;
    dispatch(sendResultsAction(false, this.props.userId, this.props.currentResult.id));
  }

  clickYes() {
    console.log('Click yes...');
    const { dispatch } = this.props;
    dispatch(sendResultsAction(true, this.props.userId, this.props.currentResult.id));
  }

  render() {
    if (this.props.hasResults) {
      return (
        <div>
          <Card>
            <div onClick={() => this.setState({ showFullProfile: true })}>
            <CardMedia
              overlay={
                <div>
                  <CardTitle title={this.props.currentResult.display} subtitle={this.props.currentResult.bio} />
                  <TagList tags={this.props.currentResult.instruments} type="instrument" />
                  <TagList tags={this.props.currentResult.genres} type="genres" />
                </div>}
            >
              <img src={this.props.currentResult.photo || '/assets/avatar.jpg'} />
            </CardMedia>
            </div>
            <CardActions>
              <FlatButton label="Yes" onClick={ this.clickYes } />
              <FlatButton label="No" onClick={ this.clickNo} />
            </CardActions>
          </Card>
          <FullscreenDialog
            open={this.state.showFullProfile}
            onRequestClose={() => this.setState({ showFullProfile: false })}
            title={this.props.currentResult.display}
            actionButton={<FlatButton
              label='Close'
              onTouchTap={() => this.setState({ showFullProfile: false })}
            />}
          >
            <CardActions>
              <FlatButton label="Yes" onClick={ this.clickYes } />
              <FlatButton label="No" onClick={ this.clickNo} />
            </CardActions>
            <ResultsProfile user={this.props.result} />
          </FullscreenDialog>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({ userId: state.auth.userId, hasResults: state.results.hasResults });

export default connect(mapStateToProps)(ResultsListEntry);
