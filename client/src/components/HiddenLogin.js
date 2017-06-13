import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';

const style = {
  margin: 30,
};

const HiddenLogin = () => (
  <div>
    <div className="bump-tab-bar" />
    <Row>
      <Col xs={12} sm={6} smOffset={3}>
        <Paper style={style} zDepth={1}>
          <Card>
            <form action="/auth/login" method="post">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" />
              </div>
              <button type="submit" className="btn btn-warning btn-lg">Login</button>
            </form>
          </Card>
        </Paper>
      </Col>
    </Row>
  </div>
);

export default HiddenLogin;
