import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, Container, Typography } from "@mui/material";
import TopBar from "../components/TopBar";

const AllCongePage = () => {
  const [congeData, setCongeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3002/conges")
      .then((response) => {
        console.log(response.data); // Log response data for debugging
        const dataWithId = response.data.map((conge, index) => ({
          ...conge,
          id: conge.id || index, // Ensure each row has a unique id
          userName: conge.User ? conge.User.name : "", // Map user name directly
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
    { field: "userName", headerName: "User Name", width: 200 }, // Display user name directly
    // { field: 'id', headerName: 'ID', width: 100 },
    { field: "nbreJour", headerName: "Number of Days", width: 150 },
    { field: "dateDebut", headerName: "Start Date", width: 200 },
    { field: "etatConge", headerName: "Status", width: 150 },
    { field: "dateCreated", headerName: "Date Created", width: 200 },
    { field: "adressConge", headerName: "Address", width: 200 },
  ];

  return (
    <>
      <TopBar />
      <div style={{ padding: "16px" }}>
        <div style={{ height: 400, width: "100%" }}>
          <h1>Tous les congé</h1>

          {loading ? (
            <CircularProgress />
          ) : (
            <DataGrid
              rows={congeData}
              columns={columns}
              pageSize={5}
              loading={loading}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AllCongePage;
