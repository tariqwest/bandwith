import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { CardTitle } from 'material-ui/Card';
import Spinner from './Spinner';
import LoadingSpinner from './LoadingSpinner';
import { getResultsInfo } from '../actions';
import ResultsListEntry from './ResultsListEntry';

const styles = {
  paper: { margin: 10 },
  title: { textAlign: 'center' },
};

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleted: false,
      completed: 0,
    };

    this.timer = this.timer.bind(this);
    this.progress = this.progress.bind(this);
    this.hideSpinner = this.hideSpinner.bind(this);
  }

  componentDidMount() {
    this.timer();
    const { dispatch, userId } = this.props;
    dispatch(getResultsInfo(userId));
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({ completed: 100 });
      this.setState({ isCompleted: true });
    } else {
      this.setState({ completed });
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 200);
    }
  }

  timer() {
    setTimeout(() => this.hideSpinner(), 3000);
  }

  hideSpinner() {
    this.setState({ isCompleted: true });
  }

  render() {
    const { results } = this.props;
    const result = results[0];

    if (!this.state.isCompleted) {
      return (
        <div>
          <div className="bump-tab-bar" />
          <Row>
            <Col xs={12} sm={6} smOffset={3}>
              <Paper style={styles.paper} zDepth={1}>
                <div style={styles.title}>
                  <LoadingSpinner />
                </div>
              </Paper>
            </Col>
          </Row>
        </div>
      );
    } else if (!result) {
      return (
        <div>
          <div className="bump-tab-bar" />
          <Row>
            <Col xs={12} sm={6} smOffset={3} >
              <Paper style={styles.paper} zDepth={1}>
                <CardTitle title="No more musicians for now, check again soon!" />
              </Paper>
            </Col>
          </Row>
        </div>
      );
    }
    return (
      <div>
        <div className="bump-tab-bar" />
        <Col xs={12} sm={6} smOffset={3} >
          <Paper style={styles.paper} zDepth={1}>
            <ResultsListEntry result={result} />
          </Paper>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  results: state.results.results,
});

export default connect(mapStateToProps)(Results);
