/**
 *
 * MenuList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ChatIcon from '@material-ui/icons/Chat';
import Divider from '@material-ui/core/Divider';

function MenuList(props) {
  const listStyle = {
    color: `${props.darkMode ? '#fafafa' : '#212121'}`,
  };

  return (
    <List>
      <ListItem button component="a" href="/Chat">
        <ListItemIcon>
          <ChatIcon style={listStyle} />
        </ListItemIcon>
        <ListItemText style={listStyle}>Realtime Chat</ListItemText>
      </ListItem>
      <Divider className={props.classes.divider} />
    </List>
  );
}

MenuList.propTypes = {
  darkMode: PropTypes.bool,
  classes: PropTypes.object,
};

export default MenuList;
