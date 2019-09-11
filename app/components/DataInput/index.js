/**
 *
 * DataInput
 *
 */

import React from 'react';
import UsernameInput from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import PasswordInput from '../PasswordInput';

function DataInput(props) {
  return (
    <div>
      <UsernameInput
        id="standard-name"
        label="Username"
        className={props.classes.textField}
        value={props.username}
        onChange={props.updateUser}
        margin="normal"
      />
      <PasswordInput
        classes={props.classes}
        password={props.password}
        updatePassw={props.updatePassw}
        passwShow={props.passwShow}
        togglePassword={props.togglePassword}
        darkMode={props.darkMode}
      />
    </div>
  );
}

DataInput.propTypes = {
  classes: PropTypes.object,
  username: PropTypes.string,
  password: PropTypes.string,
  updateUser: PropTypes.func,
  updatePassw: PropTypes.func,
  togglePassword: PropTypes.func,
  passwShow: PropTypes.bool,
  darkMode: PropTypes.bool,
};

export default DataInput;
