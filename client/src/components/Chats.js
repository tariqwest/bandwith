import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import ChatsList from './ChatsList';

class Chats extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col xs={0} sm={3} md={3} lg={3} />
        <Col xs={12} sm={6} md={6} lg={6}>
          <Card>
            <div className="chat-title">
              <img className="chat-picture" width="100" height="100" alt="profile-pic" src={this.props.currentMatch.currentMatchPhotoSrc} />
              <CardTitle
                title={this.props.currentMatch.currentMatchFirstName + ' ' + this.props.currentMatch.currentMatchLastName}
              />
            </div>
            <ChatsList />
          </Card>
        </Col>
        <Col xs={0} sm={3} md={3} lg={3} />
      </Row>
    );
  }

}

const mapStateToProps = state => ({ userId: state.auth.userId, currentMatch: state.chat });

export default connect(mapStateToProps)(Chats);
