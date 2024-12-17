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
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";

const AllCongePage = () => {
  const [congeData, setCongeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3002/conges")
      .then((response) => {
        const dataWithId = response.data.map((conge, index) => ({
          ...conge,
          id: conge.id || index,
          userName: conge.User ? conge.User.name : "",
          userId: conge.User ? conge.User.userId:"",
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
    { field: "userId", headerName: "Matricule", width: 100 },
    { field: "userName", headerName: "Nom & Prénom", width: 200 },
    { field: "nbreJour", headerName: "Nombre de Jours", width: 150 },
    { field: "dateDebut", headerName: "Date de Début", width: 200 },
    {
          field: "etatConge",
          headerName: "État",
          align: "center",
          headerAlign: "center",
          width: 110,
          renderCell: (params) => {
            const etat = params.value;
            let color;
            let backgroundColor = "";
            let textColor = "#fff"; // Default text color for better contrast
            if (etat === "Accepté") backgroundColor = "#94C973";
            if (etat === "Refusé") backgroundColor = "red";
            if (etat === "En Attente") {
              backgroundColor = "blue";
            }
    
            return (
              <Box
                sx={{
                  backgroundColor, // Dynamic background color
                 color: "#fff", // White text for better contrast
                  // padding: "6px 8px", // Padding around the text
                  // borderRadius: "4px", // Rounded corners
                  textAlign: "center", // Center the text
                  verticalAlign: "center",
                  width: "100px", // Fixed width for consistency
                  fontWeight: "bold", // Bold text
                }}
              >
                {etat}
              </Box>
            );
          },
        },
    { field: "dateCreated", headerName: "Date Créée", width: 200 },
    { field: "adressConge", headerName: "Adresse", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={() => handleUpdateEtat(params.row.id, "Accepté")}
          >
            Accepter
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleUpdateEtat(params.row.id, "Refusé")}
          >
            Refuser
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleUpdateEtat(params.row.id, "En Attente")}
          >
            En Attente
          </Button>
        </Box>
      ),
    },
  ];

  // Update EtatConge action
  const handleUpdateEtat = (congeId, etat) => {
    axios
      .patch(`http://localhost:3002/conges/${congeId}`, { etatConge: etat })
      .then(() => {
        // Update state locally
        setCongeData((prevCongeData) =>
          prevCongeData.map((conge) =>
            conge.id === congeId ? { ...conge, etatConge: etat } : conge
          )
        );
      })
      .catch((error) => {
        console.error("Error updating congé état!", error);
      });
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      <TopBar />
      <Paper
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        elevation={0}
        square
        sx={{
          backgroundColor: darkMode ? "grey.900" : "grey.100",
          color: darkMode ? "grey.300" : "grey.900",
        }}
      >
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={300}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              padding: 2,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Liste des congés
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
                onClick={handleBackClick}
              >
                Retour
              </Button>
            </Box>
            <DataGrid
              rows={congeData}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              sx={{
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                border: "1px solid #ccc",
              }}
            />
          </Box>
        )}
      </Paper>
    </>
  );
};

export default AllCongePage;
