export const CHATS_GET = 'CHATS_GET';
export const CHATS_GET_SUCCESS = 'CHATS_GET_SUCCESS';
export const CHATS_GET_FAILURE = 'CHATS_GET_FAILURE';
export const CHATS_SEND = 'CHATS_SEND';
export const CHATS_SEND_SUCCESS = 'CHATS_SEND_SUCCESS';
export const CHATS_SEND_FAILURE = 'CHATS_SEND_FAILURE';
export const CHATS_SET_CURRENT_MATCH = 'CHATS_SET_CURRENT_MATCH';


export const requestChats = () => ({
  type: CHATS_GET,
  isFetching: true,
});

export const receiveChats = currentMatchChatMessages => ({
  type: CHATS_GET_SUCCESS,
  isFetching: false,
  currentMatchChatMessages,
});

export const receiveChatsError = errorMessage => ({
  type: CHATS_GET_FAILURE,
  isFetching: false,
  errorMessage,
});

export const getChats = (userId, matchUserId) => (dispatch) => {
  dispatch(requestChats());
  return fetch(`/api/chats?userId=${userId}&matchUserId=${matchUserId}`)
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

export const requestSendChat = () => ({
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

export const sendChat = (userId, matchUserId, message) => (dispatch) => {
  dispatch(requestChats());
  return fetch(`/api/chats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      matchUserId,
      message,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(res => res.json())
    .then(json => {
      dispatch(sendChatSuccess(json));
      dispatch(getChats(json.profile_id_from, json.profile_id_to));
    })
    .catch(err => dispatch(sendChatFailure(err.message)));
};

export const setCurrentMatch = (currentMatchUserId, currentMatchFirstName, currentMatchLastName, currentMatchPhotoSrc) => ({
  type: CHATS_SET_CURRENT_MATCH,
  isFetching: false,
  currentMatchUserId,
  currentMatchFirstName,
  currentMatchLastName,
  currentMatchPhotoSrc,
});
