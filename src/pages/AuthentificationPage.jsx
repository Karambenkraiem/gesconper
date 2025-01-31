import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper, Switch, Container, AppBar, Toolbar, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { ip } from '../constants/ip';
import { Navigate, useNavigate } from 'react-router-dom';

const AuthentificationPage = () => {
  // États pour gérer les champs du formulaire et la date/heure
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [darkMode, setDarkMode] = useState(false); // Gestion du mode sombre
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Met à jour la date et l'heure actuelles
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString());
      setCurrentTime(now.toLocaleTimeString());
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // Met à jour toutes les secondes

    return () => clearInterval(interval); // Nettoyage au démontage du composant
  }, []);

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post(ip + '/auth/login', {
        userId: parseInt(userId, 10), // Convert userId to a number
        password,
      });

      // Assuming the backend sends a token on successful login
      if (response.data) {
        setSuccessMessage('Connexion réussie !');
        localStorage.setItem('token', response.data.token); // Store token for future use
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Échec de la connexion.');
    }
  };

  // Création du thème (mode sombre ou clair)
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2', // Couleur primaire
      },
      secondary: {
        main: '#dc004e', // Couleur secondaire
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundImage: 'url(/logo_steg.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Barre de navigation */}
        <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Gestion des Congés de Personnel</Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', flexGrow: 1 }}>
              Société Tunisienne d'Électricité et du Gaz
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'right' }}>
              Service Exploitation Goulette 2
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Contenu centré */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Container maxWidth="sm">
            <Paper
              sx={{
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Page de Connexion
              </Typography>

              {/* Error or Success Messages */}
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              {successMessage && <Alert severity="success">{successMessage}</Alert>}

              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Box mb={2}>
                  <TextField
                    label="Identifiant"
                    variant="outlined"
                    fullWidth
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    sx={{ borderRadius: 2 }}
                  />
                </Box>

                <Box mb={2}>
                  <TextField
                    label="Mot de passe"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ borderRadius: 2 }}
                  />
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1">Date : {currentDate}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Heure : {currentTime}</Typography>
                  </Grid>
                </Grid>

                <Box mt={3} textAlign="center">
                  <Button variant="contained" color="primary" type="submit" fullWidth>
                    Se connecter
                  </Button>
                </Box>
              </form>

              {/* Switch pour changer le mode */}
              <Box mt={2} display="flex" justifyContent="center">
                <Typography>Mode Sombre</Typography>
                <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AuthentificationPage;
