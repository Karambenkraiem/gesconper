import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Button,
  CircularProgress,
  Box,
  Stack,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import { ip, ipnet } from "../constants/ip";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCreateUserDialog, setOpenCreateUserDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [newUser, setNewUser] = useState({
    userId: null,
    name: "",
    posts: "",
    email: "",
    password: "1234567",
    role: "",
    soldeConge: 0,
  });

  const [editUser, setEditUser] = useState({
    name: "",
    role: "",
    posts: "",
    email: "",
    soldeConge: 0,
  });

  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    axios
      .get(ip + "/user")
      // .get(ipnet + "/user")
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

  // Handle user creation
  const handleCreateUser = () => {
    axios
      .post(ip +"/user", newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setOpenCreateUserDialog(false);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  // Handle input changes for creating a user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]:
        name === "userId" || name === "soldeConge"
          ? parseInt(value, 10) || 0
          : value,
    }));
  };

  // Open Edit Dialog with user data
  const handleEditClick = (user) => {
    setEditUser({
      userId:user.userId,
      role: user.role,
      name: user.name,
      posts: user.posts,
      email: user.email,
      soldeConge: user.soldeConge,
    });
    setOpenEditDialog(true);
  };

  // Handle Edit Input Change
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      // [name]: name === "soldeConge" ? parseInt(value, 10) || 0 : value,
      [name]:
      name === "soldeConge" || name === "userId" ? parseInt(value, 10) || 0 : value,

    }));
  };

  // Update user details
  const handleUpdateUser = () => {
    axios
      .patch(ip + `/user/${editUser.userId}`, editUser)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userId === editUser.userId ? { ...response.data } : user
          )
        );
        setOpenEditDialog(false);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  // Define columns for the DataGrid
  const columns = [
    { field: "userId", headerName: "Matricule", width: 150 },
    { field: "name", headerName: "Nom & Prénom", width: 200 },
    { field: "posts", headerName: "Poste", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "soldeConge", headerName: "Solde Congé", width: 150 },
    { field: "role", headerName: "role", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100%', // Ensure the container spans the available space
            height: '100%', // Adjust height as necessary to ensure proper vertical centering
            display: 'flex', // Explicitly set flexbox behavior
          }}
        >
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
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={() => handleEditClick(params.row)}
          >
            Modifier
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <TopBar />
      <Paper
        style={{
          minHeight: "100vh",
          width:"100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflowX: "hidden", // Prevents horizontal overflow

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
        ) : error ? (
          <Box textAlign="center" color="error.main">
            <Typography variant="h6">{error}</Typography>
          </Box>
        ) : (
          <Box ssx={{
            width: "calc(100% - 100px)", // Slightly smaller than the Paper to create a margin
            margin: "0 auto", // Center the DataGrid horizontally
            overflowX: "auto", // Prevent horizontal overflow
            padding: 2, // Add some padding around the grid
            boxSizing: "border-box", // Ensure padding is included in the total width
          }}>
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
                onClick={() => setOpenCreateUserDialog(true)}
              >
                Créer un utilisateur
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
      </Paper>

      {/* Create User Dialog */}
      <Dialog
        open={openCreateUserDialog}
        onClose={() => setOpenCreateUserDialog(false)}
      >
        <DialogTitle>Créer un utilisateur</DialogTitle>
        <DialogContent>
          {/* New User Input Fields */}
          <TextField
            label="Matricule"
            name="userId"
            value={newUser.userId}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nom & Prénom"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          

          <InputLabel id="role-label" >Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            name="role"
            fullWidth
            value={newUser.role}
            onChange={handleInputChange}
            label="Role"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="agent">Agent</MenuItem>
            <MenuItem value="chef Service">Chef Service</MenuItem>
            <MenuItem value="Directeur">Directeur</MenuItem>
          </Select>


          <TextField
            label="Poste"
            name="posts"
            value={newUser.posts}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Solde Congé"
            name="soldeConge"
            type="number"
            value={newUser.soldeConge}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenCreateUserDialog(false)}
            color="secondary"
          >
            Annuler
          </Button>
          <Button onClick={handleCreateUser} color="primary">
            Créer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Modifier l'utilisateur</DialogTitle>
        <DialogContent>
        
          <TextField
            label="Nom & Prénom"
            name="name"
            value={editUser.name}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          <InputLabel id="role-label" >Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            name="role"
            fullWidth
            value={editUser.role}
            onChange={handleEditInputChange}
            label="Role"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="agent">Agent</MenuItem>
            <MenuItem value="chef Service">Chef Service</MenuItem>
            <MenuItem value="Directeur">Directeur</MenuItem>
          </Select>
          {/* <TextField label="Role" name="role" value={editUser.role} onChange={handleEditInputChange} fullWidth margin="normal" /> */}
          <TextField
            label="Poste"
            name="posts"
            value={editUser.posts}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={editUser.email}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Solde Congé"
            name="soldeConge"
            type="number"
            value={editUser.soldeConge}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserPage;
