import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";
import { Card, CardContent, Typography, Button, Grid, FormControl, InputLabel, Select, MenuItem, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import DashboardGraph from "./DashboardGraph";

const RegisteredUser = () => {
  const [recentEvents, setRecentEvents] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    eventName: 'All',
    department: 'All',
    year: 'All',
    division: 'All'
  });

  useEffect(() => {
    fetchRecentEvents();
    fetchRegisteredUsers();
  }, []);

  const fetchRecentEvents = async () => {
    try {
      const eventsCollection = collection(fireDB, "events");
      const snapshot = await getDocs(eventsCollection);
      const eventsData = [];

      snapshot.forEach((doc) => {
        const event = doc.data();
        eventsData.push({ ...event, event_id: doc.id });
      });

      setRecentEvents(eventsData);
    } catch (error) {
      console.error("Error fetching recent events:", error);
    }
  };

  const fetchRegisteredUsers = async () => {
    try {
      const eventsCollection = collection(fireDB, "events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const usersData = [];

      for (const doc of eventsSnapshot.docs) {
        const eventId = doc.id;
        const registrationCollection = collection(fireDB, "events", eventId, "registration");
        const registrationSnapshot = await getDocs(registrationCollection);

        registrationSnapshot.forEach((doc) => {
          const userData = doc.data();
          usersData.push({ ...userData, eventId, user_id: doc.id });
        });
      }

      setRegisteredUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error("Error fetching registered users:", error);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions((prevFilterOptions) => ({
      ...prevFilterOptions,
      [name]: value
    }));

    applyFilters(); // Apply filters whenever a dropdown value changes
  };

  const applyFilters = () => {
    let filteredData = registeredUsers;

    for (const key in filterOptions) {
      if (filterOptions[key] !== 'All') {
        const filterValue = filterOptions[key].toLowerCase();
        filteredData = filteredData.filter(user =>
          user[key] && user[key].toLowerCase().includes(filterValue)
        );
      }
    }

    setFilteredUsers(filteredData);
  };

  useEffect(() => {
    applyFilters();
  }, [filterOptions]);

  return (
    <div style={{ padding: "10px" }}>
    
      <Typography variant="h5" gutterBottom style={{ marginTop: "20px" , paddingBottom:10 }}>Filter Users</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="eventName">Event Name</InputLabel>
            <Select
              sx={{ width: 200 }}
              value={filterOptions.eventName}
              onChange={handleFilterChange}
              inputProps={{
                name: 'eventName',
                id: 'eventName',
              }}
            >
              <MenuItem value="All">All</MenuItem>
              {recentEvents.map((event, index) => (
                <MenuItem key={index} value={event.event_name}>{event.event_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="department">Department</InputLabel>
            <Select
              sx={{ width: 200 }}
              value={filterOptions.department}
              onChange={handleFilterChange}
              inputProps={{
                name: 'department',
                id: 'department',
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="CMPN">CMPN</MenuItem>
              <MenuItem value="INFT">INFT</MenuItem>
              <MenuItem value="EXTC">EXTC</MenuItem>
              <MenuItem value="ELEC">ELEC</MenuItem>
              <MenuItem value="MECH">MECH</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="year">Year</InputLabel>
            <Select
              sx={{ width: 200 }}
              value={filterOptions.year}
              onChange={handleFilterChange}
              inputProps={{
                name: 'year',
                id: 'year',
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="FE">FE</MenuItem>
              <MenuItem value="SE">SE</MenuItem>
              <MenuItem value="TE">TE</MenuItem>
              <MenuItem value="BE">BE</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="division">Division</InputLabel>
            <Select
              sx={{ width: 200 }}
              value={filterOptions.division}
              onChange={handleFilterChange}
              inputProps={{
                name: 'division',
                id: 'division',
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>Registered Users</Typography>
      <Grid container spacing={2}>
        {filteredUsers.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="h2">
                  {user.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {user.department} | {user.year} | {user.div}
                </Typography>
                <Typography variant="body2" component="p">
                  Event: {user.event_name}
                </Typography>
                <Typography variant="body2" component="p">
                  PID: {user.pid}
                </Typography>
              </CardContent>
              <Button href={`/user/${user.user_id}`} size="small">View Details</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RegisteredUser;
