import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Switch, Paper } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Paper
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      elevation={0}
      square
      sx={{
        backgroundColor: darkMode ? 'grey.900' : 'grey.100',
        color: darkMode ? 'grey.300' : 'grey.900',
      }}
    >
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ bgcolor: darkMode ? 'grey.800' : 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AlKaramSoft
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </Typography>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/userPage')}
          sx={{ width: '200px', height: '60px' }}
        >
          Users
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/allconge')}
          sx={{ width: '200px', height: '60px' }}
        >
          Congé
        </Button>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: 'center',
          p: 2,
          bgcolor: darkMode ? 'grey.800' : 'grey.200',
        }}
      >
        <Typography variant="body2">All Rights Reserved © AlKaramSoft</Typography>
      </Box>
    </Paper>
  );
};

export default HomePage;
