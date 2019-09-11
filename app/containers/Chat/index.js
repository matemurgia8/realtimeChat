/**
 *
 * Chat
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles } from '@material-ui/core/styles';
import reducer from './reducer';

import {
  makeSelectMenuDrawer,
  makeSelectDarkMode,
  makeSelectLogged,
  makeSelectUsername,
  makeSelectPassword,
  makeSelectVisibility,
  makeSelectAvatar,
  makeSelectUsers,
  makeSelectUser,
  makeSelectChatLogs,
  makeSelectMessage,
} from './selectors';

import {
  toggleDrawer,
  toggleDark,
  userEnter,
  updateUsername,
  updatePassword,
  toggleVisibility,
  userLogout,
  sendText,
  updateMessage,
} from './actions';

// My comps imports
import NavBar from '../../components/NavBar';
import Login from '../../components/Login';
import ChatLogs from '../../components/ChatLogs';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: props => ({
    flexGrow: 1,
    backgroundColor: `${props.darkMode ? '#151515' : '#fff'}`,
  }),
  menuButton: {
    color: '#fafafa',
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  divider: {
    marginLeft: '6%',
    width: '88%',
    margin: theme.spacing(1, 0),
    backgroundColor: '#939393',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: props => ({
    width: drawerWidth,
    boxShadow:
      'rgba(0, 0, 0, 0.2) 0px 5px 20px -1px, rgba(0, 0, 0, 0.14) 0px 10px 10px 0px, rgba(0, 0, 0, 0.12) 0px 10px 10px 0px',
    backgroundColor: `${props.darkMode ? '#121212' : '#fafafa'}`,
  }),
  drawerHeader: props => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor: `${props.darkMode ? '#212121' : '#3f51b5'}`,
  }),
  appBar: props => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: `${props.darkMode ? '#212121' : '#3f51b5'}`,
  }),
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  card: props => ({
    width: '30%',
    margin: 'auto',
    marginBottom: '5%',
    marginTop: '5%',
    backgroundColor: `${props.darkMode ? '#212121' : '#fafafa'}`,
  }),
  avatar: {
    margin: 'auto',
    width: 100,
    height: 100,
  },
  textField: props => ({
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: '8.5px',
    width: '60%',
    flexBasis: 200,
    '& label': {
      color: `${props.darkMode ? '#fafafa' : '#121212'}`,
    },
    '& .MuiInput-underline::after': {
      borderBottom: `2px solid ${props.darkMode ? '#fafafa' : '#121212'}`,
    },
    '& .MuiInputBase-input': {
      color: `${props.darkMode ? '#fafafa' : '#121212'}`,
    },
    '& .Mui-focused': {
      color: `${props.darkMode ? '#fafafa' : '#121212'}`,
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: `${props.darkMode ? '#fafafa' : '#121212'}`,
    },
  }),
  margin: {
    margin: theme.spacing(1),
  },
  noBordEBoxSha: {
    boxShadow: 'none',
    borderRadius: '0px',
  },
}));

export function Chat(props) {
  useInjectReducer({ key: 'chat', reducer });
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <NavBar
        classes={classes}
        drawer={props.shownDrawer}
        toggleDrawer={props.onToggleDrawer}
        darkMode={props.darkMode}
        toggleDark={props.onToggleDark}
        logged={props.logged}
        logout={props.onLogoutClick}
      />
      {props.logged ? (
        <ChatLogs
          users={props.users}
          classes={classes}
          user={props.user}
          chatLogs={props.chatLogs}
          updateMessage={props.onMessageUpdate}
          sendMessage={props.onSendMessage}
          message={props.message}
        />
      ) : (
        <Login
          classes={classes}
          username={props.inputUsername}
          password={props.inputPassword}
          updateUser={props.onUserUpdate}
          updatePassw={props.onPasswUpdate}
          passwShow={props.passwVisibility}
          togglePassword={props.onEyeClick}
          darkMode={props.darkMode}
          avatar={props.avatar}
          enterClick={props.onEnterClick}
        />
      )}
    </div>
  );
}

Chat.propTypes = {
  shownDrawer: PropTypes.bool,
  logged: PropTypes.bool,
  darkMode: PropTypes.bool,
  passwVisibility: PropTypes.bool,
  inputPassword: PropTypes.string,
  inputUsername: PropTypes.string,
  avatar: PropTypes.string,
  users: PropTypes.array,
  user: PropTypes.object,
  chatLogs: PropTypes.array,
  message: PropTypes.string,
  onToggleDrawer: PropTypes.func,
  onToggleDark: PropTypes.func,
  onEnterClick: PropTypes.func,
  onUserUpdate: PropTypes.func,
  onPasswUpdate: PropTypes.func,
  onEyeClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
  onMessageUpdate: PropTypes.func,
  onSendMessage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  shownDrawer: makeSelectMenuDrawer(),
  darkMode: makeSelectDarkMode(),
  logged: makeSelectLogged(),
  inputUsername: makeSelectUsername(),
  inputPassword: makeSelectPassword(),
  passwVisibility: makeSelectVisibility(),
  avatar: makeSelectAvatar(),
  users: makeSelectUsers(),
  user: makeSelectUser(),
  chatLogs: makeSelectChatLogs(),
  message: makeSelectMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onToggleDrawer: () => dispatch(toggleDrawer()),
    onToggleDark: () => dispatch(toggleDark()),
    onEnterClick: () => dispatch(userEnter()),
    onUserUpdate: e => dispatch(updateUsername(e.currentTarget)),
    onPasswUpdate: e => dispatch(updatePassword(e.currentTarget)),
    onEyeClick: () => dispatch(toggleVisibility()),
    onLogoutClick: () => dispatch(userLogout()),
    onMessageUpdate: e => dispatch(updateMessage(e.currentTarget)),
    onSendMessage: () => dispatch(sendText()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Chat);
