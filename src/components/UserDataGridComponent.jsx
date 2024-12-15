import React, { useEffect, useState } from 'react';
import { Sheet, Typography, Button, CircularProgress, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/joy';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDataGridComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3002/user')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur:', error);
        setError('Impossible de charger les données');
        setLoading(false);
      });
  }, []);

  const handleCongeClick = (userId) => {
    navigate(`/conges/${userId}`);
  };

  if (loading) {
    return (
      <Sheet
        variant="soft"
        color="neutral"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 300,
        }}
      >
        <CircularProgress />
      </Sheet>
    );
  }

  if (error) {
    return (
      <Sheet
        variant="soft"
        color="danger"
        sx={{
          padding: 2,
          textAlign: 'center',
        }}
      >
        <Typography level="h6" color="danger">
          {error}
        </Typography>
      </Sheet>
    );
  }

  return (
    <Sheet
      variant="outlined"
      sx={{
        margin: 2,
        padding: 2,
        borderRadius: 'md',
        boxShadow: 'sm',
      }}
    >
      <Typography level="h4" component="h1" sx={{ marginBottom: 2 }}>
        Liste des Utilisateurs
      </Typography>
      <Table
        aria-label="Liste des utilisateurs"
        sx={{
          borderRadius: 'sm',
          overflow: 'hidden',
          boxShadow: 'sm',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>ID Utilisateur</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Posts</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.posts}</TableCell>
              <TableCell>
                <Button
                  variant="solid"
                  color="primary"
                  size="sm"
                  onClick={() => handleCongeClick(user.userId)}
                >
                  Voir Congés
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Sheet>
  );
};

export default UserDataGridComponent;
