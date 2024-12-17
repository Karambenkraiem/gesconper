import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Paper, Container } from '@mui/material';
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
        minHeight: '100vh',
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
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        maxWidth="md"
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2,
          padding: 4,
          textAlign: 'center',
        }}
      >
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            {currentTime.toLocaleDateString()}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 'light', mb: 4 }}>
            {currentTime.toLocaleTimeString()}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/user')}
          sx={{
            width: '200px',
            height: '60px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: darkMode ? 'primary.dark' : 'primary.light',
              transform: 'scale(1.05)',
            },
            mb: 2,
          }}
        >
          Utilisateurs
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/allconge')}
          sx={{
            width: '200px',
            height: '60px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: darkMode ? 'secondary.dark' : 'secondary.light',
              transform: 'scale(1.05)',
            },
          }}
        >
          Congés
        </Button>
      </Container>

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
