import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "../components/TopBar";

const Profile = () => {
  const { userId } = useParams(); // Get userId from route params
  const [user, setUser] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false); // State for leave request dialog
  const [conges, setConges] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [newConge, setNewConge] = useState({
    nbreJour: 1,
    dateDebut: "",
    adressConge: "123 Holiday Lane",
    etatConge: "En Attente",
  });


  const [editUser, setEditUser] = useState({
    userId: null,
    name: "",
    role: "user",
    posts:"",
    email: "",
    soldeConge: 0,
  });


  const handleEditClick = (user) => {
    setEditUser({
      userId: user.userId,
      name: user.name,
      role: user.role,
      posts: user.posts,
      email: user.email,
      soldeConge: user.soldeConge,
    });
    setOpenEditDialog(true);
  };


  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: name === "soldeConge" ? parseInt(value, 10) || 0 : value,
    }));
  };
  const handleUpdateUser = () => {
    axios
      .patch(`http://localhost:3002/user/${editUser.userId}`, editUser)
      .then((response) => {
        setUser(response.data);        
        setOpenEditDialog(false);
        alert("Modification des données avec succes.");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert(" Modification interdite par le systeme !!")
      });

  };

  const [dateError, setDateError] = useState(""); // To handle date error message

  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#1976d2" },
      secondary: { main: "#dc004e" },
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/user/${userId}`
        );
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Unable to fetch profile data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle opening the leave request dialog
  const handleOpenLeaveDialog = () => {
    setOpenLeaveDialog(true);
  };

  // Handle closing the leave request dialog
  const handleCloseLeaveDialog = () => {
    setOpenLeaveDialog(false);
    setDateError(""); // Clear error on close
  };

  // Handle changes in the leave request form
  const handleLeaveInputChange = (e) => {
    const { name, value } = e.target;
    setNewConge((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit the leave request
  const handleSubmitConge = () => {
    // Validation for date of leave (cannot be in the past or today)
    const today = new Date();
    const selectedDate = new Date(newConge.dateDebut);
    const tomorrow = new Date(today.setDate(today.getDate() + 1));

    if (selectedDate < tomorrow) {
      setDateError("La date de début doit être au moins demain.");
      return;
    }

    const congeData = { ...newConge, userUserId: parseInt(userId, 10) };

    axios
      .post(`http://localhost:3002/conges`, congeData)
      .then((response) => {
        setConges([...conges, response.data]);
        handleCloseLeaveDialog();
        alert(
          "Congé demandé avec succès, Attente d'approbation de Chef exploitation"
        );
      })
      .catch((error) => {
        console.error("Error submitting conge:", error);
      });
      
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
          Chargement en cours...
        </Typography>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Typography
          variant="h6"
          align="center"
          color="error"
          sx={{ marginTop: 4 }}
        >
          {error}
        </Typography>
      </ThemeProvider>
    );
  }
  const handleCongeClick = (params) => {
    navigate(`/conges/${userId}`);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1); // Minimum date is tomorrow

  return (
    <>
      <TopBar />

      <ThemeProvider theme={theme}>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Box
            sx={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.05)",
              padding: "40px 20px",
            }}
          >
            <Container maxWidth="md">
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <Avatar
                  sx={{ width: 120, height: 120, marginBottom: 2 }}
                  alt="Profile Image"
                />
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "gray", marginBottom: 3 }}
                >
                  {user.email}
                </Typography>
                <CardContent sx={{ textAlign: "center", marginBottom: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Poste: {user.posts}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    Solde congé: {user.soldeConge} jours
                  </Typography>
                </CardContent>
                <CardActions sx={{ width: "100%", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={() => handleEditClick(user)}
                  >
                    Modifier
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenLeaveDialog}
                    sx={{ width: "50%" }}
                  >
                    Demander un Congé
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(params) => handleCongeClick(params?.userId)}
                    sx={{ width: "50%" }}
                  >
                    Liste de mes congés{" "}
                  </Button>
                </CardActions>
              </Card>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>

      {/* Leave Request Dialog */}
      <Dialog open={openLeaveDialog} onClose={handleCloseLeaveDialog}>
        <DialogTitle>Demander un Congé</DialogTitle>
        <DialogContent>
          <TextField
            label="Date de début"
            type="date"
            name="dateDebut"
            value={newConge.dateDebut}
            onChange={handleLeaveInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: minDate.toISOString().split("T")[0], // Disable past dates and today
            }}
            error={!!dateError}
            helperText={dateError}
          />
          <TextField
            label="Nombre de Jours"
            type="number"
            fullWidth
            value={newConge.nbreJour}
            onChange={(e) =>
              setNewConge({
                ...newConge,
                nbreJour: parseInt(e.target.value, 10) || 0,
              })
            }
            margin="normal"
            inputProps={{ min: 1 }}
          />
          <TextField
            label="Adresse pendant le congé (optionnel)"
            name="adressConge"
            value={newConge.adressConge}
            onChange={handleLeaveInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLeaveDialog} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleSubmitConge} color="primary">
            Soumettre
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Modifier l'utilisateur</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom & Prénom"
            name="name"
            value={editUser.name}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Poste"
            name="posts"
            value={editUser.posts}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={editUser.email}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          {/* <TextField
            label="Solde Congé"
            name="soldeConge"
            type="number"
            value={editUser.soldeConge}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
