import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, Grid, Paper, Typography, AppBar, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { userId } = useParams(); // Get userId from route params
  const [user, setUser] = useState(null); // State to hold user data
  const [conges, setConges] = useState([]); // State to hold leave records
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // React Router's navigation function

  // Theme setup
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2', // Primary color (blue)
      },
      secondary: {
        main: '#dc004e', // Secondary color (pink)
      },
    },
  });

  // Fetch user data and congés from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get(`http://localhost:3002/user/${userId}`);
        setUser(userResponse.data);

        // Fetch user's congés
        const congeResponse = await axios.get(`http://localhost:3002/user/${userId}/conges`);
        setConges(congeResponse.data);

        setLoading(false); // Set loading to false after fetching data
      } catch (err) {
        console.error('Error fetching user data or congés:', err);
        setError('Unable to fetch profile or leave data.');
        setLoading(false); // Set loading to false on error
      }
    };

    fetchUserData();
  }, [userId]);

  // Render a loading state if data is not yet loaded
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
          Chargement en cours Steg Energie pour toujours...
        </Typography>
      </ThemeProvider>
    );
  }

  // Render error state if something went wrong
  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Typography variant="h6" align="center" color="error" sx={{ marginTop: 4 }}>
          {error}
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
              Profile
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.05)', padding: '20px' }}>
          <Container maxWidth="sm">
            <Paper sx={{ padding: 4, borderRadius: 3, boxShadow: 3, backgroundColor: '#fff' }}>
              {/* Profile Header */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  sx={{ width: 100, height: 100, marginBottom: 2 }}
                  alt="Profile Image"
                  src="/default-avatar.png"
                />
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  {user.name}
                </Typography>
                <Typography variant="body1" sx={{ color: 'gray', marginBottom: 2 }}>
                  {user.email}
                </Typography>
                <Button variant="outlined" sx={{ marginBottom: 2 }}>
                  Modifier profile
                </Button>
              </Box>

              {/* User Info */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Poste
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {user.posts}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Solde congé
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {user.soldeConge}
              </Typography>

              {/* Leave Information (Congés) */}
              {/* <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Leave Records (Congés)
              </Typography> */}
              {/* <Grid container spacing={2}>
                {conges.length > 0 ? (
                  conges.map((conge, index) => (
                    <Grid item xs={6} key={index}>
                      <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                        <Typography variant="body2">
                          From: {conge.startDate} <br />
                          To: {conge.endDate}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ marginLeft: 2 }}>
                    No leave records available.
                  </Typography>
                )}
              </Grid> */}

              {/* Navigate to "Mes Congés" */}
              <Box textAlign="center" sx={{ marginTop: 3 }}>
                <Button variant="contained" color="primary" onClick={() => navigate(`/conges/${userId}`)}>
                  Liste des congés
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
