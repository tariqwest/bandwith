import {
  CHATS_GET,
  CHATS_SEND,
  CHATS_GET_SUCCESS,
  CHATS_GET_FAILURE,
  CHATS_SEND_SUCCESS,
  CHATS_SEND_FAILURE,
} from '../actions';

const chat = (state = {
  isFetching: false,
  errorMessage: '',
  allChatMessages: [],
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
        allChatMessages: action.allChatMessages,
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
    default:
      return state;
  }
};

export default chat;
