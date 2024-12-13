import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, TextField, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CongePage = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const [conges, setConges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newConge, setNewConge] = useState({
    dateDebut: "2024-12-15",
    nbreJour: 1,
    adressConge: "123 Holiday Lane",
    
  });

  // Function to fetch the user's congés
  useEffect(() => {
    axios
      .get(`http://localhost:3002/user/${userId}/conges`)
      .then((response) => {
        setConges(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching congés:', error);
        setLoading(false);
      });
  }, [userId]);

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to handle submitting the new congé
  const handleSubmitConge = () => {
    const congeData = { ...newConge, userUserId: parseInt(userId, 10) }; // Include userId

    axios
      .post(`http://localhost:3002/conges`, congeData)
      .then((response) => {
        setConges([...conges, response.data]); // Add the new conge to the list
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error submitting conge:', error);
      });
  };

  // Columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'dateCreated', headerName: 'Date Création', width: 200 },
    { field: 'dateDebut', headerName: 'Date Début', width: 200 },
    { field: 'nbreJour', headerName: 'Nombre de Jours', width: 200 },
    { field: 'adressConge', headerName: 'Adresse Congé', width: 250 },
    {
      field: 'etatConge',
      headerName: 'État',
      width: 150,
      renderCell: (params) => {
        const etat = params.value;
        let color;
        if (etat === 'Accepté') color = 'green';
        if (etat === 'Refusé') color = 'red';
        if (etat === 'En Attente') color = 'yellow';

        return <div style={{ color }}>{etat}</div>;
      },
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Congés de l'utilisateur {userId}</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <DataGrid
            rows={conges}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Faire une demande de congé
          </Button>

          {/* Modal for requesting a conge */}
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <h2 id="modal-title">Demande de Congé</h2>
              <TextField
                label="Date de début"
                type="date"
                fullWidth
                value={newConge.dateDebut}
                onChange={(e) =>
                  setNewConge({ ...newConge, dateDebut: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
              <TextField
                label="Nombre de Jours"
                type="number"
                fullWidth
                value={newConge.nbreJour}
                onChange={(e) =>
                  setNewConge({ ...newConge, nbreJour: parseInt(e.target.value, 10) || 0 })
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
              <Button variant="contained" color="primary" onClick={handleSubmitConge}>
                Soumettre
              </Button>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
};

export default CongePage;
