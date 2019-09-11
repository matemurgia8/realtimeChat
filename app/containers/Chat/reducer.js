/*
 *
 * Chat reducer
 *
 */
import produce from 'immer';
import uuidv4 from 'uuid/v4';
import {
  DEFAULT_ACTION,
  TOGGLE_DARK_ACTION,
  TOGGLE_DRAWER_ACTION,
  USER_ENTER_ACTION,
  UPDATE_USERNAME_ACTION,
  UPDATE_PASSWORD_ACTION,
  TOGGLE_PASSW_VISIBILITY_ACTION,
  USER_LOGOUT_ACTION,
  UPDATE_MESSAGE_ACTION,
  SEND_TEXT_ACTION,
} from './constants';

import { socket } from '../../configs';

export const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true',
  toggleMenuDrawer: false,
  logged: false,
  users: [],
  user: {},
  chatLogs: [],
  message: '',
  usernameInput: '',
  avatar: '',
  passwordInput: '',
  passwVisibility: false,
};

let serverLogout;
let log;

/* eslint-disable default-case, no-param-reassign */
const chatReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;

      case TOGGLE_DRAWER_ACTION:
        if (draft.toggleMenuDrawer) {
          draft.toggleMenuDrawer = false;
        } else {
          draft.toggleMenuDrawer = true;
        }
        break;

      case TOGGLE_DARK_ACTION:
        if (draft.darkMode) {
          draft.darkMode = false;
        } else {
          draft.darkMode = true;
        }
        localStorage.setItem('darkMode', draft.darkMode);
        break;

      case USER_ENTER_ACTION:
        draft.logged = true;
        draft.user = {
          id: uuidv4(),
          username: draft.usernameInput,
          password: draft.passwordInput,
          avatar: draft.avatar,
        };
        draft.users.push(draft.user);
        /* socket && */ socket.emit('SEND_USER_TO_SERVER', draft.user);

        draft.chatLogs.push({
          author: 'server',
          id: '0',
          content: `${draft.user.username} joined the chat!`,
        });

        /* socket && */ socket.emit('SEND_MESSAGE_TO_SERVER', {
          author: 'server',
          id: '0',
          content: `${draft.user.username} joined the chat!`,
        });

        break;

      case UPDATE_USERNAME_ACTION:
        draft.usernameInput = action.payload.value;
        draft.avatar = action.payload.value.charAt(0);
        break;

      case UPDATE_PASSWORD_ACTION:
        draft.passwordInput = action.payload.value;
        break;

      case TOGGLE_PASSW_VISIBILITY_ACTION:
        if (draft.passwVisibility) {
          draft.passwVisibility = false;
        } else {
          draft.passwVisibility = true;
        }
        break;

      case UPDATE_MESSAGE_ACTION:
        draft.message = action.payload.value;
        break;

      case SEND_TEXT_ACTION:
        log = {
          author: draft.user.username,
          id: draft.user.id,
          content: draft.message,
        };
        draft.message = '';
        draft.chatLogs.push(log);
        /* socket && */ socket.emit('SEND_MESSAGE_TO_SERVER', log);
        break;

      case 'DELIVER_UPDATED_DATA_TO_REDUCER':
        draft.users = action.updatedUsers.users;
        draft.chatLogs = action.updatedUsers.chatLogs;
        break;

      case 'NEW_USER_TO_REDUCER':
        draft.users.push(action.newUser);
        break;

      case 'NEW_MESSAGE_TO_REDUCER':
        draft.chatLogs.push(action.newMessage);
        break;

      case 'DATA_TO_REDUCER':
        draft.chatLogs = action.data;
        break;

      case USER_LOGOUT_ACTION:
        serverLogout = {
          author: 'server',
          id: '0',
          content: `${draft.user.username} left the chat!`,
        };

        draft.chatLogs.push(serverLogout);

        /* socket && */ socket.emit('SEND_MESSAGE_TO_SERVER', serverLogout);

        /* socket && */ socket.emit('REMOVE_USER_FROM_SERVER', draft.user);

        draft.logged = false;
        draft.avatar = '';
        draft.passwordInput = '';
        draft.usernameInput = '';
        draft.user = {};
        break;
    }
  });
export default chatReducer;
