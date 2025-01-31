import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Paper,
  Container,
} from "@mui/material";
import { Brightness4, Brightness7, PeopleAltRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import { jwtDecode } from "jwt-decode"; // Correctly import jwtDecode

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState("--"); // Placeholder for user's name
  const navigate = useNavigate();

  // Fetch user name from token
  useEffect(() => {
    const token = localStorage.getItem("token"); // Récupération du jeton
    if (token) {
      try {
        const decoded = jwtDecode(token); // Décodage du token
        console.log("Token décodé :", decoded); // Vérifiez le contenu
        if (decoded?.name) {
          setUserName(decoded.name); // Mise à jour du nom d'utilisateur
        }
      } catch (err) {
        console.error("Erreur lors du décodage du token :", err);
      }
    }
  }, []);

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
    <Paper
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      elevation={0}
      square
      sx={{
        backgroundColor: darkMode ? "grey.900" : "grey.100",
        color: darkMode ? "grey.300" : "grey.900",
      }}
    >
      {/* Navigation Bar */}
      <AppBar
        position="static"
        sx={{ bgcolor: darkMode ? "grey.800" : "primary.main" }}
      >
        <Toolbar>
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
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Gestion des congés des agents Exploitation
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
          padding: 4,
          textAlign: "center",
        }}
      >
        <Box>
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
            {currentTime.toLocaleDateString()}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: "light", mb: 4 }}>
            {currentTime.toLocaleTimeString()}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUserClick}
          sx={{
            width: "200px",
            height: "60px",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: darkMode ? "primary.dark" : "primary.light",
              transform: "scale(1.05)",
            },
            mb: 2,
          }}
        >
          Les Agents
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCongeClick}
          sx={{
            width: "200px",
            height: "60px",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: darkMode ? "secondary.dark" : "secondary.light",
              transform: "scale(1.05)",
            },
          }}
        >
          Les congés
        </Button>
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
L'agent:        </Typography>
        <Typography variant="h3" sx={{ fontWeight: "light", mb: 4 }}>
          {userName} {/* Display the connected user's name */}
        </Typography>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          p: 2,
          bgcolor: darkMode ? "grey.800" : "grey.200",
        }}
      >
        <Typography variant="body2">
          All Rights Reserved © AlKaramSoft 2025
        </Typography>
      </Box>
    </Paper>
  );
};

export default HomePage;
