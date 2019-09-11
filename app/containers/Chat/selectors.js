import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chat state domain
 */

const selectChatDomain = state => state.chat || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Chat
 */

const makeSelectChat = () =>
  createSelector(
    selectChatDomain,
    substate => substate,
  );

const makeSelectMenuDrawer = () =>
  createSelector(
    selectChatDomain,
    substate => substate.toggleMenuDrawer,
  );

const makeSelectDarkMode = () =>
  createSelector(
    selectChatDomain,
    substate => substate.darkMode,
  );

const makeSelectUsername = () =>
  createSelector(
    selectChatDomain,
    substate => substate.usernameInput,
  );

const makeSelectPassword = () =>
  createSelector(
    selectChatDomain,
    substate => substate.passwordInput,
  );

const makeSelectVisibility = () =>
  createSelector(
    selectChatDomain,
    substate => substate.passwVisibility,
  );

const makeSelectAvatar = () =>
  createSelector(
    selectChatDomain,
    substate => substate.avatar,
  );

const makeSelectLogged = () =>
  createSelector(
    selectChatDomain,
    substate => substate.logged,
  );

const makeSelectUsers = () =>
  createSelector(
    selectChatDomain,
    substate => substate.users,
  );

const makeSelectUser = () =>
  createSelector(
    selectChatDomain,
    substate => substate.user,
  );

const makeSelectChatLogs = () =>
  createSelector(
    selectChatDomain,
    substate => substate.chatLogs,
  );

const makeSelectMessage = () =>
  createSelector(
    selectChatDomain,
    substate => substate.message,
  );

export default makeSelectChat;
export {
  selectChatDomain,
  makeSelectDarkMode,
  makeSelectMenuDrawer,
  makeSelectLogged,
  makeSelectUsername,
  makeSelectPassword,
  makeSelectVisibility,
  makeSelectAvatar,
  makeSelectUsers,
  makeSelectUser,
  makeSelectChatLogs,
  makeSelectMessage,
};
