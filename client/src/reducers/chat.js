import {
  CHATS_GET,
  CHATS_SEND,
  CHATS_GET_SUCCESS,
  CHATS_GET_FAILURE,
  CHATS_SEND_SUCCESS,
  CHATS_SEND_FAILURE,
  CHATS_SET_CURRENT_MATCH,
  CHATS_SENT_ADD,
  CHATS_RECEIVED_ADD,
} from '../actions';

const chat = (state = {
  currentMatchUserId: null,
  currentMatchChatMessages: [],
  isFetching: false,
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case CHATS_GET:
      return {
        ...state,
        isFetching: true,
      };
    case CHATS_GET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
        currentMatchChatMessages: action.currentMatchChatMessages,
      };
    case CHATS_GET_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMesage,
      };
    case CHATS_SEND:
      return {
        ...state,
        isFetching: true,
      };
    case CHATS_SEND_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
        chatMessage: action.chatMessage,
      };
    case CHATS_SEND_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMesage,
        chatMessage: action.chatMessage,
      };
    case CHATS_SET_CURRENT_MATCH:
      return {
        ...state,
        currentMatchUserId: action.currentMatchUserId,
      };
    case CHATS_SENT_ADD:
      return {
        ...state,
        currentMatchChatMessages: state.currentMatchChatMessages
        .concat([JSON.parse(action.sentChat)]),
      };
    case CHATS_RECEIVED_ADD:
      return {
        ...state,
        currentMatchChatMessages: state.currentMatchChatMessages
        .concat([JSON.parse(action.receivedChat)]),
      };
    default:
      return state;
  }
};

export default chat;
