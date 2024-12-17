import React, { useState } from "react";
import { Modal, TextField, Box, Typography, Button } from "@mui/material";


const DemandeCongeModal = ({ open, onClose, newConge, setNewConge, handleSubmitConge }) => {
    const [dateError, setDateError] = useState(""); // To handle date error message
  
  const handleLeaveInputChange = (e) => {
    const { name, value } = e.target;
    setNewConge((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }; 
  const minDate = new Date();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" gutterBottom>
          Demande de Congé
        </Typography>
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
        />
        <TextField
          label="Adresse Congé"
          fullWidth
          value={newConge.adressConge}
          onChange={(e) =>
            setNewConge({ ...newConge, adressConge: e.target.value })
          }
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitConge}
          sx={{ marginTop: 2 }}
          fullWidth
        >
          Soumettre
        </Button>
      </Box>
    </Modal>
  );
};

export default DemandeCongeModal;
