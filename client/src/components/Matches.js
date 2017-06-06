import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import MatchList from './MatchList';

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col xs={0} sm={3} md={3} lg={3} />
        <Col xs={12} sm={6} md={6} lg={6}>
          <Card>
            <CardTitle title="Connections" />
            <MatchList />
          </Card>
        </Col>
        <Col xs={0} sm={3} md={3} lg={3} />
      </Row>
    );
  }
}

const mapStateToProps = state => ({ userId: state.auth.userId });

export default connect(mapStateToProps)(Matches);
