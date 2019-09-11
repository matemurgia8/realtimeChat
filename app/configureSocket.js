import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const configureSocket = dispatch => {
  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('NEW_USER_TO_CLIENTS', user => {
    dispatch({ type: 'NEW_USER_TO_REDUCER', newUser: user });
  });

  socket.on('NEW_MESSAGE_TO_CLIENTS', message => {
    dispatch({ type: 'NEW_MESSAGE_TO_REDUCER', newMessage: message });
  });

  socket.on('DATA_TO_CLIENT', data => {
    dispatch({ type: 'DATA_TO_REDUCER', data });
  });

  socket.on('CURRENT_USERS', users =>
    dispatch({ type: 'CURRENT_USERS_TO_REDUCER', users }),
  );

  socket.on('CHAT_HISTORY', chatLogs =>
    dispatch({ type: 'CHAT_HISTORY_TO_REDUCER', chatLogs }),
  );

  return socket;
};

export const getDataFromServer = () => socket.emit('GET_DATA_FROM_SERVER');

export default configureSocket;
