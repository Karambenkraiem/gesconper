import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDataGridComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Appel API pour récupérer les utilisateurs
    axios.get("http://localhost:3002/user")
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Il y a eu une erreur:', error);
        setLoading(false);
      });
  }, []);

  // Colonnes pour le DataGrid
  const columns = [
    { field: 'userId', headerName: 'ID Utilisateur', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Nom', width: 200 },
    { field: 'posts', headerName: 'Posts', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCongeClick(params.row.userId)}
        >
          Voir Congés
        </Button>
      ),
    },
  ];

  // Fonction pour naviguer vers la page des congés
  const handleCongeClick = (userId) => {
    navigate(`/conges/${userId}`);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Liste des Utilisateurs</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={users.map(user => ({ ...user, id: user.userId }))} // Ajouter l'id unique ici
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row.userId} // Alternative pour définir l'id unique si pas modifié dans les données
        />
      )}
    </div>
  );
};

export default UserDataGridComponent;
