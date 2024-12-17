import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home"; // Import the Home icon
import { useNavigate } from "react-router-dom"; // For navigation
import { Brightness4, Brightness7 } from "@mui/icons-material";


const TopBar = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  const handleHomeClick = () => {
    navigate("/"); // Navigate to the home page
  };
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
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
