/**
 *
 * ChatLogs
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import uuidv4 from 'uuid/v4';
import { getDataFromServer } from '../../configureSocket';

// import Avatar from '@material-ui/core/Avatar';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
  },
});

const scrollToBottom = () => {
  const objDiv = document.getElementById('chat');
  objDiv.scrollTop = objDiv.scrollHeight;
};

const backgroundColor = '#fff';

const roomTitleStyle = {
  float: 'right',
  width: '80%',
  height: '60px',
  backgroundColor: `${backgroundColor}`,
  borderLeft: '0.5px solid black',
  borderBottom: '0.5px solid black',
  paddingLeft: '1%',
};
const userListStyle = {
  float: 'left',
  width: '20%',
  backgroundColor: `${backgroundColor}`,
  borderBottom: '1px solid black',
  paddingLeft: '2%',
};
const chatStyle = {
  overflowY: 'auto',
  overflowX: 'hidden',
  height: '100%',
  maxHeight: '605px',
};
const usernameStyle = {
  margin: '5px',
  marginBottom: '0px',
  fontWeight: 'bold',
};
const messageContentStyle = {
  margin: '5px',
  marginLeft: '10px',
  marginTop: '0px',
};

let once = true;

class ChatLogs extends Component {
  componentWillMount() {
    if (once) {
      getDataFromServer(this.props);
      once = false;
    }
  }

  componentDidUpdate() {
    scrollToBottom();
  }

  render() {
    return (
      <div>
        <Paper
          className={this.props.classes.noBordEBoxSha}
          style={userListStyle}
        >
          <h4>Online users</h4>
          <ul>
            {this.props.users.map(user => (
              <li key={user.id}>
                <span>{user.username}</span>
              </li>
            ))}
          </ul>
        </Paper>
        <Paper
          className={this.props.classes.noBordEBoxSha}
          style={roomTitleStyle}
        >
          <h2>The first of many chat rooms</h2>
        </Paper>
        <Paper
          className={this.props.classes.noBordEBoxSha}
          style={{
            width: '80%',
            height: '610px',
            float: 'right',
            backgroundColor: `${backgroundColor}`,
            borderLeft: '0.5px solid black',
            borderBottom: '0.5px solid black',
          }}
        >
          <div id="chat" style={chatStyle}>
            {this.props.chatLogs.map(log => {
              const userId = this.props.user.id;
              if (log.id !== '0') {
                return (
                  <Paper
                    key={uuidv4()}
                    style={{
                      // width: 'auto',
                      padding: '0.5%',
                      margin: '1%',
                      backgroundColor: `${
                        userId === log.id ? '#a3b1ff' : '#cad2ff'
                      }`,
                      marginLeft: `${userId === log.id ? '50%' : '1%'}`,
                      marginRight: `${userId === log.id ? '1%' : '50%'}`,
                    }}
                  >
                    <p style={usernameStyle}>{log.author}</p>
                    <p style={messageContentStyle}>{log.content}</p>
                  </Paper>
                );
              }
              return (
                <Paper
                  key={uuidv4()}
                  style={{
                    backgroundColor: '#fef3c5',
                    width: '50%',
                    padding: '1%',
                    margin: '1% auto',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ display: 'inline-block' }}>{log.content}</span>
                </Paper>
              );
            })}
          </div>
        </Paper>
        <Paper
          className={this.props.classes.noBordEBoxSha}
          style={{
            float: 'right',
            width: '80%',
            height: '80px',
            backgroundColor: `${backgroundColor}`,
            borderLeft: '0.5px solid black',
          }}
        >
          <ThemeProvider theme={theme}>
            <TextField
              className={this.props.classes.margin}
              style={{ width: '96%', margin: '2%' }}
              label="Type your message"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              onChange={this.props.updateMessage}
              value={this.props.message}
              onKeyDown={e => {
                const text = this.props.message;
                if (e.key === 'Enter') {
                  if (text.length > 0) {
                    this.props.sendMessage();
                  }
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="send message"
                      onClick={this.props.sendMessage}
                      disabled={this.props.message.length === 0}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </ThemeProvider>
        </Paper>
      </div>
    );
  }
}

ChatLogs.propTypes = {
  sendMessage: PropTypes.func,
  message: PropTypes.string,
  updateMessage: PropTypes.func,
  margin: PropTypes.object,
  noBordEBoxSha: PropTypes.object,
  chatLogs: PropTypes.array,
  classes: PropTypes.object,
  user: PropTypes.object,
  users: PropTypes.array,
};

export default ChatLogs;
