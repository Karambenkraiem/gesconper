import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import DemandeCongeModal from '../Modal/DemandeCongeModal';

const CongePage = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const [conges, setConges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [userName, setUserName] = useState(''); // New state to hold the user's name
  const [newConge, setNewConge] = useState({
    nbreJour: 1,
    dateDebut: "2024-12-15",
    adressConge: "123 Holiday Lane",
  });

  const navigate = useNavigate(); // Initialize navigation function

  // Fetch the user's congés and user data
  useEffect(() => {
    axios
      .get(`http://localhost:3002/user/${userId}/conges`)
      .then((response) => {
        console.log(response.data); // Log response data for debugging

        // Set userName from the first conge's User object, assuming user is consistent across all records
        if (response.data.length > 0 && response.data[0].User) {
          setUserName(response.data[0].User.name);
        }

        const dataWithId = response.data.map((conge, index) => ({
          ...conge,
          id: conge.id || index, 
        }));
        setConges(dataWithId);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the congé data!", error);
        setLoading(false);
      });
  }, [userId]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSubmitConge = () => {
    const congeData = { ...newConge, userUserId: parseInt(userId, 10) };

    axios
      .post(`http://localhost:3002/conges`, congeData)
      .then((response) => {
        setConges([...conges, response.data]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error submitting conge:', error);
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'dateCreated', headerName: 'Date Création', width: 200 },
    { field: 'dateDebut', headerName: 'Date Début', width: 200 },
    { field: 'nbreJour', headerName: 'Nombre de Jours', width: 200 },
    { field: 'userName', headerName: 'Name', width: 200 },
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
        if (etat === 'En Attente') color = 'orange';

        return <Typography style={{ color }}>{etat}</Typography>;
      },
    },
  ];

  return (
    <>
      <TopBar />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Congés de {userName}
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 2 }}>
              {/* Back Button */}
              <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
                Retour
              </Button>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <DataGrid
                rows={conges}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}></Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
              >
                Faire une demande de congé
              </Button>
            </Box>

            <DemandeCongeModal
              open={openModal}
              onClose={handleCloseModal}
              newConge={newConge}
              setNewConge={setNewConge}
              handleSubmitConge={handleSubmitConge}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default CongePage;
