import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const MesCongesPage = () => {
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [leaveRequest, setLeaveRequest] = useState({
    dateDebut: "",
    nbreJour: "",
    etatConge: "Pending", // "En Attente" par défaut
    adressConge: "",
  });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveRequest({ ...leaveRequest, [name]: value });
  };

  const handleSubmitLeaveRequest = () => {
    // Envoi de la requête à l'API backend pour créer la demande de congé
    axios
      .post("http://localhost:3000/conge/request", leaveRequest)
      .then((response) => {
        console.log("Leave request submitted:", response.data);
        setLeaveRequest({
          dateDebut: "",
          nbreJour: "",
          etatConge: "Pending",
          adressConge: "",
        }); // Réinitialiser le formulaire
        setOpenModal(false); // Fermer le modal
        // Optionnel : Rafraîchir les listes de congés après la soumission
        fetchLeaveData();
      })
      .catch((error) =>
        console.error("Error submitting leave request:", error)
      );
  };

  // Récupérer les congés approuvés et en attente
  useEffect(() => {
    fetchLeaveData();
  }, []);

  const fetchLeaveData = () => {
    axios
      .get("http://localhost:3000/conge/approved")
      .then((response) => setApprovedLeaves(response.data))
      .catch((error) =>
        console.error("Error fetching approved leaves:", error)
      );

    axios
      .get("http://localhost:3000/conge/pending")
      .then((response) => setPendingLeaves(response.data))
      .catch((error) => console.error("Error fetching pending leaves:", error));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container>
        {/* Section Congés Approuvés */}
        <Paper sx={{ padding: 3, marginBottom: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Congés Approuvés
          </Typography>
          <Grid container spacing={2}>
            {approvedLeaves.map((leave) => (
              <Grid item xs={12} sm={6} key={leave.id}>
                <Paper sx={{ padding: 2, backgroundColor: "#e3f2fd" }}>
                  <Typography variant="body1">
                    <strong>Date Début:</strong> {leave.dateDebut}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Nombre de Jours:</strong> {leave.nbreJour}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Etat:</strong> {leave.etatConge}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Adresse:</strong> {leave.adressConge}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Section Congés En Attente */}
        <Paper sx={{ padding: 3, marginBottom: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Congés En Attente
          </Typography>
          <Grid container spacing={2}>
            {pendingLeaves.map((leave) => (
              <Grid item xs={12} sm={6} key={leave.id}>
                <Paper sx={{ padding: 2, backgroundColor: "#ffecb3" }}>
                  <Typography variant="body1">
                    <strong>Date Début:</strong> {leave.dateDebut}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Nombre de Jours:</strong> {leave.nbreJour}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Etat:</strong> {leave.etatConge}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Adresse:</strong> {leave.adressConge}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Bouton pour demander un congé */}
        <Box textAlign="center">
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Demander un Congé
          </Button>
        </Box>
      </Container>

      {/* Modal de Demande de Congé */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow: 24,
            width: "400px",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Demande de Congé
          </Typography>
          <TextField
            label="Date Début"
            type="date"
            name="dateDebut"
            value={leaveRequest.dateDebut}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Nombre de Jours"
            type="number"
            name="nbreJour"
            value={leaveRequest.nbreJour}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            {/* <InputLabel>Etat du Congé</InputLabel>
            <Select disabled label="Etat du Congé" name="etatConge" value={leaveRequest.etatConge} onChange={handleChange}>
              <MenuItem  value="Pending">En Attente</MenuItem>
              <MenuItem value="Approved">Approuvé</MenuItem>
              <MenuItem value="Rejected">Rejeté</MenuItem>
            </Select> */}
            <TextField
              label="Etat du Congé"
              name="etatConge"
              value="En Attente" // Valeur fixe pour l'état
              fullWidth
              disabled // Rendre le champ non modifiable
              sx={{ marginBottom: 2 }}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <TextField
            label="Adresse durant le Congé"
            name="adressConge"
            value={leaveRequest.adressConge}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitLeaveRequest}
            >
              Soumettre
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseModal}
            >
              Annuler
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default MesCongesPage;
