import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Typography, Box, Grid, Avatar } from "@mui/material";
import { fireDB } from "../firebase/firebaseConfig"; // Import the Firestore instance
import { collection, getDocs, query } from "firebase/firestore";
import DashboardGraph from "./DashboardGraph";
import { useTheme } from "@mui/material/styles";

const Dashboard = () => {
  const theme = useTheme();
  const [events, setEvents] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("event_name");

  useEffect(() => {
    // Fetch events from Firebase database
    const fetchEvents = async () => {
      try {
        const eventsSnapshot = query(collection(fireDB, "events"));
        const querySnapshot = await getDocs(eventsSnapshot);

        const eventList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedEvents = events.sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    if (orderBy === "event_name") {
      return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else {
      return order === "asc" ? aValue - bValue : bValue - aValue;
    }
  });

  return (
    <div style={{ backgroundColor: "#5c6fff", minHeight: "100vh", padding: "20px", color: theme.palette.text.primary }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DashboardGraph />
        </Grid>
        <Grid item xs={12}>
          <Box p={2}>
            <Typography variant="h5" align="center" gutterBottom sx={{ color: theme.palette.primary.main }}>
              Events
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: theme.palette.background.paper }}>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "event_name"}
                        direction={orderBy === "event_name" ? order : "asc"}
                        onClick={() => handleRequestSort("event_name")}
                        sx={{ color: theme.palette.primary.main }}
                      >
                        Event Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={orderBy === "category"}
                        direction={orderBy === "category" ? order : "asc"}
                        onClick={() => handleRequestSort("category")}
                        sx={{ color: theme.palette.primary.main }}
                      >
                        Category
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={orderBy === "date"}
                        direction={orderBy === "date" ? order : "asc"}
                        onClick={() => handleRequestSort("date")}
                        sx={{ color: theme.palette.primary.main }}
                      >
                        Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={orderBy === "price"}
                        direction={orderBy === "price" ? order : "asc"}
                        onClick={() => handleRequestSort("price")}
                        sx={{ color: theme.palette.primary.main }}
                      >
                        Price
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <Avatar alt={event.event_name} src={event.event_image} />
                      </TableCell>
                      <TableCell>{event.event_name}</TableCell>
                      <TableCell align="right">{event.category}</TableCell>
                      <TableCell align="right">{event.date}</TableCell>
                      <TableCell align="right">{event.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
