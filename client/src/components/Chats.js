import React from 'react';
import ChatsList from './ChatsList';
import { connect } from 'react-redux';

class Chats extends React.Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <div>
        <div>Match Info Placeholder</div>
        <ChatsList />
      </div>
    );
  }

}

const mapStateToProps = state => ({ userId: state.auth.userId });

export default connect(mapStateToProps)(Chats);
