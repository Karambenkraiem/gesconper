import React from 'react';
import { Avatar, Box, Button, Container, Grid, Paper, Typography, AppBar, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Sample user data
const user = {
  id: 1,
  email: 'user@example.com',
  name: 'John Doe',
  posts: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ligula ante.',
  Conge: ['2024-12-05', '2024-12-10', '2024-12-20'],
};

const Profile = () => {
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
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;
