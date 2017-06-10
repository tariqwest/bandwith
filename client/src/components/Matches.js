import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import MatchList from './MatchList';
import Paper from 'material-ui/Paper';

const style = {
  margin: 10,
};

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <Paper style={style} zDepth={1}>
            <Card>
              <MatchList />
            </Card>
          </Paper>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({ userId: state.auth.userId });

export default connect(mapStateToProps)(Matches);
