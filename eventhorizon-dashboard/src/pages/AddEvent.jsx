import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import the useTheme hook
import { fireDB } from "../firebase/firebaseConfig"; // Import the Firestore instance
import { collection, addDoc } from "firebase/firestore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const AddEvent = () => {
  const theme = useTheme(); // Access the current theme

  const [eventData, setEventData] = useState({
    event_image: "",
    event_name: "",
    price: "",
    category: "",
    date: "",
    instructions: [""],
    committee: "", // Added committee field
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newInstructions = [...eventData.instructions];
    newInstructions[index] = value;
    setEventData((prevData) => ({
      ...prevData,
      instructions: newInstructions,
    }));
  };

  const handleAddInstruction = () => {
    setEventData((prevData) => ({
      ...prevData,
      instructions: [...prevData.instructions, ""],
    }));
  };

  const handleRemoveInstruction = (index) => {
    const newInstructions = [...eventData.instructions];
    newInstructions.splice(index, 1);
    setEventData((prevData) => ({
      ...prevData,
      instructions: newInstructions,
    }));
  };

  const handleAddEvent = async () => {
    const eventRef = await addDoc(collection(fireDB, "events"), {
      event_image: eventData.event_image,
      event_name: eventData.event_name,
      price: eventData.price,
      category: eventData.category,
      date: eventData.date,
      instructions: eventData.instructions,
      committee: eventData.committee,
      form:{} // Added committee field
    })
      .then((docRef) => {
        console.log("Event added with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding event: ", error);
      });

    setEventData({
      event_image: "",
      event_name: "",
      price: "",
      category: "",
      date: "",
      instructions: [""],
      committee: "", 
     // Added committee field
    });
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}>
      <Typography variant="h5" gutterBottom>
        Add Event
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="event_image"
            label="Image URL"
            fullWidth
            value={eventData.event_image}
            onChange={(e) =>
              setEventData({ ...eventData, event_image: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="event_name"
            label="Event Name"
            fullWidth
            value={eventData.event_name}
            onChange={(e) =>
              setEventData({ ...eventData, event_name: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="price"
            label="Price"
            fullWidth
            value={eventData.price}
            onChange={(e) =>
              setEventData({ ...eventData, price: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            name="category"
            label="Category"
            fullWidth
            value={eventData.category}
            onChange={(e) =>
              setEventData({ ...eventData, category: e.target.value })
            }
          >
            <MenuItem value="workshop">Workshop</MenuItem>
            <MenuItem value="hackathon">Hackathon</MenuItem>
            <MenuItem value="sports">Sports</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="date"
            label="Date"
            type="date"
            fullWidth
            value={eventData.date}
            onChange={(e) =>
              setEventData({ ...eventData, date: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            name="committee"
            label="Committee"
            fullWidth
            value={eventData.committee}
            onChange={(e) =>
              setEventData({ ...eventData, committee: e.target.value })
            }
          >
            <MenuItem value="ISTE">ISTE</MenuItem>
            <MenuItem value="ITSA">ITSA</MenuItem>
            <MenuItem value="IEEE">IEEE</MenuItem>
            <MenuItem value="EESA">EESA</MenuItem>
            <MenuItem value="MESA">MESA</MenuItem>
            <MenuItem value="SC">SC</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Instructions:</Typography>
          {eventData.instructions.map((instruction, index) => (
            <Grid container spacing={2} alignItems="center" key={index}>
              <Grid item xs={10}>
                <TextField
                  name={`instruction-${index}`}
                  label={`Instruction ${index + 1}`}
                  fullWidth
                  value={instruction}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  color="primary"
                  onClick={() => handleRemoveInstruction(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button startIcon={<AddIcon />} onClick={handleAddInstruction}>
            Add Instruction
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddEvent}>
            Add Event
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddEvent;
