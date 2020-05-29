import React from 'react';
import {ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';

export const mainListItems = (changeContentType, contentsType) => (
  <div>
    <ListItem button onClick={() => changeContentType(contentsType.DASHBOARD)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button onClick={() => changeContentType(contentsType.SUMMARY)}>
      <ListItemIcon>
        <SpeakerNotes />
      </ListItemIcon>
      <ListItemText primary="Summary" />
    </ListItem>
  </div>
);
