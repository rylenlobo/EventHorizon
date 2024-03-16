import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const GetAllRegisteredUsers = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(fireDB, "events");
        const snapshot = await getDocs(eventsCollection);
        const eventsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventChange = async (eventId) => {
    setSelectedEvent(eventId);
    try {
      const eventDocRef = collection(fireDB, "events", eventId, "registrations");
      const eventRegistrationsSnapshot = await getDocs(eventDocRef);
      const registrationsData = eventRegistrationsSnapshot.docs.map((doc) => doc.data());
      setRegisteredUsers(registrationsData);
    } catch (error) {
      console.error("Error fetching registered users:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Get All Registered Users
      </Typography>
      <Select
        value={selectedEvent}
        onChange={(e) => handleEventChange(e.target.value)}
        style={{ marginBottom: "20px" }}
      >
        <MenuItem value="">Select Event</MenuItem>
        {events.map((event) => (
          <MenuItem key={event.id} value={event.id}>
            {event.event_name}
          </MenuItem>
        ))}
      </Select>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Registration Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registeredUsers.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.register}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default GetAllRegisteredUsers;
