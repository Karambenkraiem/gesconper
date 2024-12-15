import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AppBar, Toolbar, Typography, Button, CircularProgress, Box, Container, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    axios
      .get('http://localhost:3002/user')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Unable to fetch user data');
        setLoading(false);
      });
  }, []);

  // Handle navigation to the user's leave page
  const handleCongeClick = (userId) => {
    navigate(`/conges/${userId}`);
  };

  // Handle navigation to the profile page
  const handleProfileClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  // Handle "Back" button click
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  // Define columns for the DataGrid
  const columns = [
    { field: 'userId', headerName: 'Matricule', width: 150 },
    { field: 'name', headerName: 'Nom & Prénom', width: 200 },
    { field: 'posts', headerName: 'Poste', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleCongeClick(params.row.userId)}
          >
            Voir Congés
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleProfileClick(params.row.userId)}
          >
            Voir Profil
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      {/* TopBar Component */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Gestion des agents
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ mt: 4 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button variant="outlined" onClick={handleBackClick}>
            Retour
          </Button>
        </Stack>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box textAlign="center" color="error.main">
            <Typography variant="h6">{error}</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              height: 400,
              width: '100%',
              borderRadius: 1,
              backgroundColor: '#fff',
              padding: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Liste des agents
            </Typography>
            <DataGrid
              rows={users.map((user) => ({ ...user, id: user.userId }))}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default UserPage;
