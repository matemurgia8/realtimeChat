/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import DataInput from '../DataInput';

function Login(props) {
  return (
    <Card className={props.classes.card}>
      <CardContent>
        <Avatar
          // alt='MM'
          // src="icon-512x512.png"
          className={props.classes.avatar}
        >
          {props.avatar.toUpperCase() + props.avatar.toUpperCase()}
        </Avatar>
        <DataInput
          classes={props.classes}
          username={props.username}
          updateUser={props.updateUser}
          password={props.password}
          updatePassw={props.updatePassw}
          passwShow={props.passwShow}
          togglePassword={props.togglePassword}
          darkMode={props.darkMode}
        />
      </CardContent>
      <CardActions>
        <Button
          onClick={props.enterClick}
          disabled={!(props.username !== '' && props.password !== '')}
        >
          Enter
        </Button>
      </CardActions>
    </Card>
  );
}

Login.propTypes = {
  classes: PropTypes.object,
  username: PropTypes.string,
  password: PropTypes.string,
  avatar: PropTypes.string,
  updateUser: PropTypes.func,
  updatePassw: PropTypes.func,
  enterClick: PropTypes.func,
  togglePassword: PropTypes.func,
  passwShow: PropTypes.bool,
  darkMode: PropTypes.bool,
};

export default Login;
