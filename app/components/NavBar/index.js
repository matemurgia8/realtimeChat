/**
 *
 * NavBar
 *
 */

import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';

import MenuDrawer from '../MenuDrawer';

function NavBar(props) {
  return (
    <div className={props.classes.root}>
      <AppBar
        position="static"
        className={clsx(props.classes.appBar, {
          [props.classes.appBarShift]: props.drawer,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={clsx(
              props.classes.menuButton,
              props.drawer && props.classes.hide,
            )}
            color="inherit"
            aria-label="menu"
            onClick={props.toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={props.classes.title}>
            Realtime Chat
          </Typography>
          <Button
            onClick={props.logout}
            style={{ display: `${props.logged ? 'inherit' : 'none'}` }}
          >
            Logout
          </Button>
          <IconButton
            color="inherit"
            aria-label="toggle-mode"
            onClick={props.toggleDark}
          >
            {props.darkMode ? <WbSunnyIcon /> : <WbSunnyOutlinedIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <MenuDrawer
        classes={props.classes}
        closeDrawer={props.toggleDrawer}
        open={props.drawer}
        dark={props.darkMode}
      />
    </div>
  );
}
NavBar.propTypes = {
  classes: PropTypes.object,
  drawer: PropTypes.bool,
  darkMode: PropTypes.bool,
  logged: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  toggleDark: PropTypes.func,
  logout: PropTypes.func,
};

export default NavBar;
