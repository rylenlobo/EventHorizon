import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import { fireDB } from '../firebase/firebaseConfig'; // Import the Firestore instance
import {
    collection,
    addDoc,
  } from 'firebase/firestore';

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    imgUrl: '',
    name: '',
    entryFee: '',
    sponsors: '',
    date: '',
    committeeName: '',
    category: '',
    timing: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddEvent =  async () =>{
    const eventRef = await addDoc(collection(fireDB,"events"),{
      imgUrl: eventData.imgUrl,
      name: eventData.name,
      entryFee: eventData.entryFee,
      sponsors: eventData.sponsors,
      date: eventData.date,
      committeeName: eventData.committeeName,
      category: eventData.category,
      timing: eventData.timing,
      description: eventData.description
    }).then((docRef) => {
        console.log("Event added with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding event: ", error);
      });

    setEventData({
      imgUrl: '',
      name: '',
    //   id: '',
      entryFee: '',
      sponsors: '',
      date: '',
      committeeName: '',
      category: '',
      timing: '',
      description: ''
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>Add Event</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="imgUrl"
            label="Image URLs"
            fullWidth
            value={eventData.imgUrl}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={eventData.name}
            onChange={handleChange}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            name="id"
            label="ID"
            fullWidth
            value={eventData.id}
            onChange={handleChange}
          />
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <TextField
            name="entryFee"
            label="Entry Fee"
            fullWidth
            value={eventData.entryFee}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="sponsors"
            label="Sponsors"
            fullWidth
            value={eventData.sponsors}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="date"
            label="Date"
            type="date"
            fullWidth
            value={eventData.date}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="committeeName"
            label="Committee Name"
            fullWidth
            value={eventData.committeeName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="category"
            label="Category"
            fullWidth
            value={eventData.category}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="timing"
            label="Timing"
            fullWidth
            value={eventData.timing}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={eventData.description}
            onChange={handleChange}
          />
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
