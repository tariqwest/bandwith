import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText, CardMedia, CardHeader } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import ChatsList from './ChatsList';
import ResultsProfile from './ResultsProfile';
import Paper from 'material-ui/Paper';
import ResultsListEntry from './ResultsListEntry';

const styles = {
  paper: { margin: 10 },
  title: { textAlign: 'center' },
};

class Chats extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showFullMatchProfile: false,
    };
  }

  handleProfileDisplayToggle = () => {
    if(this.state.showFullMatchProfile){
      this.setState({showFullMatchProfile: false});
    }else{
      this.setState({showFullMatchProfile: true});
    }
  };

  render() {
    const currentMatch = this.props.matches.filter((match) => match.id === this.props.currentMatchUserId)[0];
    const {
      first,
      last,
      photo_src
    } = currentMatch;
    return (
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <Paper style={styles.paper}>
          <Card
            expanded={this.state.showFullMatchProfile}
            onExpandChange={this.handleProfileDisplayToggle}
            >
            <CardHeader
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText
              actAsExpander={true}
              showExpandableButton={false}
            >
            <div className="chat-title">
              <img className="chat-picture" width="100" height="100" alt="profile-pic" src={photo_src || '/assets/avatar.jpg'} />
              <CardTitle
                title={`${first} ${last}`}
              />
            </div>
            </CardText>
            <CardText expandable={true} >
              <ResultsProfile currentMatch={currentMatch} />
            </CardText>
          </Card>
          </Paper>
          <Paper style={styles.paper} >
          <Card>
            <ChatsList currentMatch={currentMatch} />
          </Card>
          </Paper>
        </Col>
      </Row>
    );
  }

}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  currentMatchUserId: state.chat.currentMatchUserId,
  matches: state.matches.matches,
});

export default connect(mapStateToProps)(Chats);
