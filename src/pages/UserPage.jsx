import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Button,
  CircularProgress,
  Box,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    axios
      .get("http://localhost:3002/user")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Unable to fetch user data");
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
    { field: "userId", headerName: "Matricule", width: 150 },
    { field: "name", headerName: "Nom & Prénom", width: 200 },
    { field: "posts", headerName: "Poste", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center" // Centre horizontalement le contenu
          alignItems="center" // Centre verticalement le contenu
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            justifyContent="center"
            alignItems="center"
            onClick={() => handleCongeClick(params.row.userId)}
          >
            Voir Congés
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            justifyContent="center"
            alignItems="center"
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
      <TopBar />

      
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={300}
        >
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
            width: "100%",
            borderRadius: 1,
            backgroundColor: "#fff",
            padding: 2,
          }}
        >
          
<Typography variant="h4" gutterBottom>
              Liste des agents
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: 2,
            }}
          >
            {/* Back Button */}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(-1)}
            >
              Retour
            </Button>
          </Box>
          <DataGrid
            rows={users.map((user) => ({ ...user, id: user.userId }))}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </Box>
      )}
    </>
  );
};

export default UserPage;
