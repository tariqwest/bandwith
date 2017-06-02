export const CHATS_GET = 'CHATS_GET';
export const CHATS_GET_SUCCESS = 'CHATS_GET_SUCCESS';
export const CHATS_GET_FAILURE = 'CHATS_GET_FAILURE';
export const CHATS_SEND = 'CHATS_SEND';
export const CHATS_SEND_SUCCESS = 'CHATS_SEND_SUCCESS';
export const CHATS_SEND_FAILURE = 'CHATS_SEND_FAILURE';

export const requestChats = () => ({
  type: CHATS_GET,
  isFetching: true,
});

export const receiveChats = allChatMessages => ({
  type: CHATS_GET_SUCCESS,
  isFetching: false,
  allChatMessages,
});

export const receiveChatsError = errorMessage => ({
  type: CHATS_GET_FAILURE,
  isFetching: false,
  errorMessage,
});

export const getChats = userId => (dispatch) => {
  dispatch(requestChats());
  return fetch(`/api/chats?userId=${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(res => res.json())
    .then(json => dispatch(receiveChats(json)))
    .catch(err => dispatch(receiveChatsError(err.message)));
};

export const requestSendChat = chatMessage => ({
  type: CHAT_SEND,
  isFetching: true,
});

export const sendChatSuccess = chatMessage => ({
  type: CHATS_SEND_SUCCESS,
  isFetching: false,
  chatMessage,
});

export const sendChatFailure = errorMessage => ({
  type: CHATS_SEND_FAILURE,
  isFetching: false,
  errorMessage,
});

export const sendChat = (userId, matchUserId) => (dispatch) => {
  dispatch(requestChats());
  return fetch(`/api/chats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      matchUserId,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(res => res.json())
    .then(json => dispatch(sendChatSuccess(json)))
    .catch(err => dispatch(sendChatFailure(err.message)));
};

