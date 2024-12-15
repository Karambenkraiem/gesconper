import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  AppBar,
  Toolbar,
  CircularProgress,
  Container,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AllCongePage = () => {
  const [congeData, setCongeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3002/conges")
      .then((response) => {
        const dataWithId = response.data.map((conge, index) => ({
          ...conge,
          id: conge.id || index, 
          userName: conge.User ? conge.User.name : "", 
        }));
        setCongeData(dataWithId);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the congé data!", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "userName", headerName: "Nom & Prénom", width: 200 },
    { field: "nbreJour", headerName: "Nombre de Jours", width: 150 },
    { field: "dateDebut", headerName: "Date de Début", width: 200 },
    { field: "etatConge", headerName: "Statut", width: 150 },
    { field: "dateCreated", headerName: "Date Créée", width: 200 },
    { field: "adressConge", headerName: "Adresse", width: 200 },
  ];

  // Handle "Back" button click
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      {/* TopBar Component */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Tous les congés
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
        ) : (
          <Box
            sx={{
              height: 400,
              width: "100%",
              // boxShadow: 2,
              borderRadius: 1,
              backgroundColor: "#fff",
              padding: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Liste des congés
            </Typography>
            <DataGrid
              rows={congeData}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              sx={{
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                border: "1px solid #ccc",
              }}
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default AllCongePage;
