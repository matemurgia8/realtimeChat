/**
 *
 * MenuDrawer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useTheme } from '@material-ui/core/styles';

import MenuList from '../MenuList';

function MenuDrawer(props) {
  const theme = useTheme();

  return (
    <div>
      <Drawer
        className={props.classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{ paper: props.classes.drawerPaper }}
      >
        <div className={props.classes.drawerHeader}>
          <IconButton
            onClick={props.closeDrawer}
            className={props.classes.menuButton}
          >
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <MenuList darkMode={props.dark} classes={props.classes} />
      </Drawer>
    </div>
  );
}

MenuDrawer.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  dark: PropTypes.bool,
  closeDrawer: PropTypes.func,
};

export default MenuDrawer;
