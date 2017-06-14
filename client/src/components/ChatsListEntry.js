import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import LoadingSpinner from './LoadingSpinner';
import moment from 'moment';

const styles = {
  paper: { margin: 10 },
  title: { textAlign: 'center' },
};

class ChatListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const secondary = moment(this.props.chatMessage.created_at).fromNow();

    if (this.props.isFetching) {
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
    } else if (this.props.chatMessage.profile_id_from === this.props.user.id) {
      return (
        <ListItem
          primaryText={this.props.chatMessage.message}
          secondaryText={secondary}
          rightAvatar={<Avatar src={this.props.user.photo_src_small || '/assets/avatar.jpg'} />}
          style={{ textAlign: 'right' }}
        />
      );
    }
    return (
      <ListItem
        primaryText={this.props.chatMessage.message}
        secondaryText={secondary}
        leftAvatar={<Avatar src={this.props.currentMatch.photo_src_small || '/assets/avatar.jpg'} />}
      />
    );
  }
}

const mapStateToProps = state => ({
  chat: state.chat,
  user: state.user.profile,
  isFetching: state.chat.isFetching,
});

export default connect(mapStateToProps)(ChatListEntry);
