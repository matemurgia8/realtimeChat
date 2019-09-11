/*
 *
 * Chat actions
 *
 */

import {
  DEFAULT_ACTION,
  TOGGLE_DARK_ACTION,
  TOGGLE_DRAWER_ACTION,
  UPDATE_USERNAME_ACTION,
  UPDATE_PASSWORD_ACTION,
  TOGGLE_PASSW_VISIBILITY_ACTION,
  USER_ENTER_ACTION,
  USER_LOGOUT_ACTION,
  UPDATE_MESSAGE_ACTION,
  SEND_TEXT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function toggleDrawer(payload) {
  return {
    type: TOGGLE_DRAWER_ACTION,
    payload,
  };
}

export function toggleDark(payload) {
  return {
    type: TOGGLE_DARK_ACTION,
    payload,
  };
}

export function userEnter(payload) {
  return {
    type: USER_ENTER_ACTION,
    payload,
  };
}

export function updateUsername(payload) {
  return {
    type: UPDATE_USERNAME_ACTION,
    payload,
  };
}

export function updatePassword(payload) {
  return {
    type: UPDATE_PASSWORD_ACTION,
    payload,
  };
}

export function toggleVisibility(payload) {
  return {
    type: TOGGLE_PASSW_VISIBILITY_ACTION,
    payload,
  };
}

export function userLogout(payload) {
  return {
    type: USER_LOGOUT_ACTION,
    payload,
  };
}

export function updateMessage(payload) {
  return {
    type: UPDATE_MESSAGE_ACTION,
    payload,
  };
}

export function sendText(payload) {
  return {
    type: SEND_TEXT_ACTION,
    payload,
  };
}
