import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Typography,
} from "@mui/material";
import { fireDB } from "../firebase/firebaseConfig"; // Import the Firestore instance
import { collection, getDocs, query } from "firebase/firestore";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

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

  return (
    <div>
      <List>
        {events.length != 0 ? (
          events.map((event) => (
            <ListItem key={event.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={event.name} src={event.imgUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={event.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      // className={classes.inline}
                      color="textPrimary"
                    >
                      Registered Users: {event.entryFee}
                    </Typography>
                    {/* Add more details as needed */}
                  </React.Fragment>
                }
              />
              <Button variant="contained" color="primary">
                View
              </Button>
            </ListItem>
          ))
        ) : (
          <ListItem> No Events are There</ListItem>
        )}
      </List>
    </div>
  );
};

export default Dashboard;
