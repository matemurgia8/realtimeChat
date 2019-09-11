/**
 *
 * PasswordInput
 *
 */

import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function PasswordInput(props) {
  return (
    <FormControl
      style={{ marginLeft: '20%', marginRight: '20%', width: '60%' }}
      className={clsx(props.classes.margin, props.classes.textField)}
    >
      <InputLabel htmlFor="adornment-password">Password</InputLabel>
      <Input
        id="adornment-password"
        type={props.passwShow ? 'text' : 'password'}
        value={props.password}
        onChange={props.updatePassw}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={props.togglePassword}
              // onMouseDown={handleMouseDownPassword}
            >
              {props.passwShow ? (
                <Visibility
                  style={{
                    color: `${props.darkMode ? '#fafafa' : '#121212'}`,
                  }}
                />
              ) : (
                <VisibilityOff
                  style={{
                    color: `${props.darkMode ? '#fafafa' : '#121212'}`,
                  }}
                />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

PasswordInput.propTypes = {
  classes: PropTypes.object,
  passwShow: PropTypes.bool,
  darkMode: PropTypes.bool,
  password: PropTypes.string,
  updatePassw: PropTypes.func,
  togglePassword: PropTypes.func,
};

export default PasswordInput;
