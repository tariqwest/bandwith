import React from 'react';

const ChatListEntry = props => (
  <div>to_id: { props.chatMessage.profile_id_to }, from_id: { props.chatMessage.profile_id_from } message: { props.chatMessage.message } time_stamp: { props.chatMessage.created_at }</div>
);

export default ChatListEntry;
