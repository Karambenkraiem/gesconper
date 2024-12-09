import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <IconButton color="inherit">
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
