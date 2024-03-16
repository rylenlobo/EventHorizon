import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { storage, fireDB } from "../firebase/firebaseConfig";

const useStyles = makeStyles((theme) => ({
  all: {
    padding: 20,
  },
  formControl: {
    marginBottom: 2,
    minWidth: "100%",
  },
  text: {
    marginBottom: 10,
    minWidth: "100%",
  },
}));

const AddReport = () => {
  const classes = useStyles();
  const [eventNames, setEventNames] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [images, setImages] = useState([]);
  const [reportData, setReportData] = useState({
    registeredUsers: "",
    attendees: "",
    absents: "",
    description: "",
    expenditure: "",
    earning: "",
    entryFee: "",
  });

  useEffect(() => {
    const fetchEventNames = async () => {
      try {
        const eventCollection = collection(fireDB, "events");
        const snapshot = await getDocs(eventCollection);
        const eventNamesArray = snapshot.docs.map((doc) => doc.data().event_name);
        setEventNames(eventNamesArray);
      } catch (error) {
        console.error("Error fetching event names:", error);
      }
    };

    fetchEventNames();
  }, []);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages(files);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData({ ...reportData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storageRef = ref(storage);
      const eventRef = storageRef.child(selectedEvent);

      images.forEach((image, index) => {
        const uploadTask = eventRef.child(`${index}_${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.error("Error uploading image:", error);
          },
          () => {
            console.log("Image uploaded successfully!");
          }
        );
      });
    } catch (error) {
      console.error("Error uploading images:", error);
    }

    const eventData = {
      event: selectedEvent,
      ...reportData,
    };

    try {
      const docRef = await addDoc(collection(fireDB, "reports"), eventData);
      setReportData({
        registeredUsers: "",
        attendees: "",
        absents: "",
        description: "",
        expenditure: "",
        earning: "",
        entryFee: "",
      });
      console.log("Report added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding report:", error);
    }
  };
 
  return (
    <div className={classes.all}>
      <Typography variant="h5" gutterBottom>
        Add Event Report
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{mb:.6, minWidth:"100%"}}
        >
          <InputLabel id="event-label">Event Name</InputLabel>
          <Select
            labelId="event-label"
            id="event"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            required
          >
            {eventNames.map((eventName, index) => (
              <MenuItem key={index} value={eventName}>
                {eventName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        <TextField
          sx={{mb:1,minWidth:"100%"}}
          label="Registered Users"
          name="registeredUsers"
          value={reportData.registeredUsers}
          onChange={handleInputChange}
          required
        />
        <TextField
          sx={{mb:1,minWidth:"100%"}}
          label="Attendees"
          name="attendees"
          type="number"
          value={reportData.attendees}
          onChange={handleInputChange}
          required
        />
        <TextField
          sx={{mb:1,minWidth:"100%"}}
          label="Absents"
          name="absents"
          type="number"
          value={reportData.absents}
          onChange={handleInputChange}
          required
        />
        <TextField
          sx={{mb:1,minWidth:"100%"}}
          label="Description"
          name="description"
          value={reportData.description}
          onChange={handleInputChange}
          required
        />
        <TextField
         sx={{mb:1,minWidth:"100%"}}
          label="Expenditure in Rs."
          name="expenditure"
          type="number"
          value={reportData.expenditure}
          onChange={handleInputChange}
          required
        />
        <TextField
          sx={{mb:1,minWidth:"100%"}}
          label="Earning in Rs."
          name="earning"
          type="number"
          value={reportData.earning}
          onChange={handleInputChange}
          required
        />
        <TextField
          sx={{mb:1,minWidth:"100%"}}
          label="Entry Fee in Rs."
          name="entryFee"
          type="number"
          value={reportData.entryFee}
          onChange={handleInputChange}
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddReport;
