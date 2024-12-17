import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home"; // Import the Home icon
import { useNavigate } from "react-router-dom"; // For navigation
import { Brightness4, Brightness7, PeopleAltRounded } from "@mui/icons-material";
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
const TopBar = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  const handleHomeClick = () => {
    navigate("/"); 
  };
  const handleUserClick = () => {
    navigate("/user"); 
  };
  const handleCongeClick = () => {
    navigate("/allconge"); 
  }; 
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Home IconButton on the left */}
        <IconButton
          color="inherit"
          onClick={handleHomeClick}
          edge="start"
          sx={{ mr: 2 }}
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={handleUserClick}
          edge="start"
          sx={{ mr: 2 }}
        >
          <PeopleAltRounded />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={handleCongeClick}
          edge="start"
          sx={{ mr: 2 }}
        >
          <InventoryRoundedIcon />
        </IconButton>


        
        {/* Title in the center */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          GesConPer
        </Typography>
        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {/* Profile Avatar */}
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
