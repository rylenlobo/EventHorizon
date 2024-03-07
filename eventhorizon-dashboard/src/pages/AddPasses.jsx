import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import { fireDB } from '../firebase/firebaseConfig'; // Import the Firestore instance
import {
    collection,
    addDoc,
  } from 'firebase/firestore';
  

const AddPasses = () => {
  const [passData, setPassData] = useState({
    imageUrl: '',
    eventName: '',
    price: '',
    category: '',
    limit: '',
    dateTime: '',
    aboutEvent: '',
    instructions: '',
    termsConditions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddPasses = async() => {
    // Perform action to add passes
    console.log('Add passes for event: ', passData.eventName);
    const passRef = await addDoc(collection(fireDB,"passes"),{
        passData
    }).then((docRef) => {
        console.log("Passes added with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding event: ", error);
      });

    // Reset form fields
    setPassData({
      imageUrl: '',
      eventName: '',
      price: '',
      category: '',
      limit: '',
      dateTime: '',
      aboutEvent: '',
      instructions: '',
      termsConditions: ''
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>Add Passes</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="imageUrl"
            label="Image URL (QR)"
            fullWidth
            value={passData.imageUrl}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="eventName"
            label="Event Name"
            fullWidth
            value={passData.eventName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="price"
            label="Price"
            fullWidth
            value={passData.price}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="category"
            label="Category"
            fullWidth
            value={passData.category}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="limit"
            label="Limit"
            fullWidth
            value={passData.limit}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="dateTime"
            label="Date & Time"
            type="datetime-local"
            fullWidth
            value={passData.dateTime}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="aboutEvent"
            label="About Event"
            fullWidth
            multiline
            rows={4}
            value={passData.aboutEvent}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="instructions"
            label="Instructions"
            fullWidth
            multiline
            rows={4}
            value={passData.instructions}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="termsConditions"
            label="Terms & Conditions"
            fullWidth
            multiline
            rows={4}
            value={passData.termsConditions}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddPasses}>
            Add Passes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddPasses;
