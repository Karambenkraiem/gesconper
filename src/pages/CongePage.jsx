import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, CircularProgress, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import DemandeCongeModal from "../Modal/DemandeCongeModal";

const CongePage = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const [conges, setConges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [newConge, setNewConge] = useState({
    nbreJour: 1,
    dateDebut: "2024-12-15",
    adressConge: "123 Holiday Lane",
    etatConge: "En Attente",
  });

  const navigate = useNavigate(); // Initialize navigation function
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mois commence à 0
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };
  
  // Fetch congés data
  useEffect(() => {
    axios
      .get(`http://localhost:3002/user/${userId}/conges`)
      .then((response) => {
        if (response.data.length > 0 && response.data[0].User) {
          setUserName(response.data[0].User.name);
        }

        const dataWithId = response.data.map((conge, index) => ({
          ...conge,
          id: conge.id || index,
          dateCreated: formatDateTime(conge.dateCreated), // Formatage ici
        dateDebut: formatDateTime(conge.dateDebut),     // Formatage ici
        }));
        setConges(dataWithId);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching congé data!", error);
        setLoading(false);
      });
  }, [userId]);

  // Update EtatConge action

  const handleUpdateEtat = (congeId, etat) => {
    axios
      .patch(`http://localhost:3002/conges/${congeId}`, { etatConge: etat })
      .then(() => {
        setConges((prevConges) =>
          prevConges.map((conge) =>
            conge.id === congeId ? { ...conge, etatConge: etat } : conge
          )
        );
      })
      .catch((error) => {
        console.error("Error updating congé état!", error);
      });
  };
  





  // const handleUpdateEtat = (congeId, etat) => {
  //   axios
  //     .patch(`http://localhost:3002/conges/${congeId}`, { etatConge: etat })
  //     .then(() => {
  //       // Update state locally
  //       setConges((prevConges) =>
  //         prevConges.map((conge) =>
  //           conge.id === congeId ? { ...conge, etatConge: etat } : conge
  //         )
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error updating congé état!", error);
  //     });
  // };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSubmitConge = () => {
    const congeData = { ...newConge,
       userUserId: parseInt(userId, 10) };

    axios
      .post(`http://localhost:3002/conges`, congeData)
      .then((response) => {
        setConges([...conges, response.data]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error submitting conge:", error);
      });
  };

  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "dateCreated",
      headerName: "Date Création",
      width: 200,
      align: "center",
      headerAlign: "center",
      sortDirection: "asc"
    },
    {
      field: "dateDebut",
      headerName: "Date Début",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "nbreJour",
      headerName: "Nombre de Jours",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "adressConge",
      headerName: "Adresse Congé",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
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
            textAlign="center"
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

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
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



      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Congés de {userName}
        </Typography>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: 2,
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate(-1)}
              >
                Retour
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: 2 }}

                onClick={handleOpenModal}
              >
                Faire une demande de congé
              </Button>






            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <DataGrid
                rows={conges}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                sortModel={[
                  {
                    field: "dateCreated",
                    sort: "desc", // Default sort by 'dateCreated' in descending order (newest first)
                  },
                ]}
              />
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
            >
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
      </Paper>

    </>
  );
};

export default CongePage;
