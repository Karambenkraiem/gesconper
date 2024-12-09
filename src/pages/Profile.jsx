import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, Grid, Paper, Typography, AppBar, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null); // State to hold user data
  const navigate = useNavigate(); // React Router's navigation function

  // Theme setup
  const theme = createTheme({
    palette: {
      mode: 'light', // Can switch to 'dark' mode if preferred
      primary: {
        main: '#1976d2', // Primary color (blue)
      },
      secondary: {
        main: '#dc004e', // Secondary color (pink)
      },
    },
  });

  // Fetch user data from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/1'); // Replace with your API endpoint
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  // Render a loading state if data is not yet loaded
  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
          Loading profile...
        </Typography>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* AppBar */}
        <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Profile Page
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.05)', padding: '20px' }}>
          <Container maxWidth="sm">
            <Paper sx={{ padding: 4, borderRadius: 3, boxShadow: 3, backgroundColor: '#fff' }}>
              {/* Profile Header */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }} alt="Profile Image" src="/default-avatar.png" />
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  {user.name}
                </Typography>
                <Typography variant="body1" sx={{ color: 'gray', marginBottom: 2 }}>
                  {user.email}
                </Typography>
                <Button variant="outlined" sx={{ marginBottom: 2 }}>
                  Edit Profile
                </Button>
              </Box>

              {/* User Info */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Posts
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {user.posts}
              </Typography>

              {/* Leave Information (Conge) */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Leave Records (Conge)
              </Typography>
              <Grid container spacing={2}>
                {user.Conge.map((date, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                      <Typography variant="body2">{date}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {/* Navigate to "Mes Congés" */}
              <Box textAlign="center" sx={{ marginTop: 3 }}>
                <Button variant="contained" color="primary" onClick={() => navigate('/mesconges')}>
                  Mes Congés
                </Button>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;
