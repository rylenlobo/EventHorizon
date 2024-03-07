const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { PythonShell } = require("python-shell");
const app = express();
const upload = multer({ dest: "uploads/" }); // set the destination for uploaded files
const cors = require("cors");

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin
  })
);
app.use(express.json({ limit: "50mb" })); // Remove header from base64 image

app.post("/api/process-image", upload.single("image"), (req, res) => {
  // Convert base64 image to a file
  const base64Image = req.body.image; // Access the base64 string from req.body
  const path = `uploads/image.png`; // You may want to generate a unique name for each image

  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  fs.writeFile(path, base64Image, "base64", (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Set the options for PythonShell
    let options = {
      pythonPath:
        "C:/Users/Rylen/AppData/Local/Programs/Python/Python311/python.exe",
      pythonOptions: ["-u"],
      scriptPath:
        "C:\\Users\\Rylen\\Desktop\\Projects\\EventHorizon\\server_event_horizon", // Path to the directory containing your Python script
      args: [path],
    };

    let data = {};
    // Run Python script
    PythonShell.run("sfit_id_updated.py", options)
      .then((messages) => {
        // results is an array consisting of messages collected during execution
        Object.assign(
          data,
          JSON.parse(messages[2]),
          JSON.parse(messages[3]),
          JSON.parse(messages[4])
        );
        const image = fs.readFileSync("profile-pic.jpg");
        const imageBase64 = Buffer.from(image).toString("base64");
        data.image = imageBase64;
        res.json(data); // send the data as the response
      })
      .catch((err) => {
        res.status(500).json({ error: err.message }); // send any errors
      });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
