const express = require("express");
const multer = require("multer");
const { PythonShell } = require("python-shell");
const app = express();
const upload = multer({ dest: "uploads/" }); // set the destination for uploaded files

app.post("/api/process-image", upload.single("image"), (req, res) => {
  // Set the options for PythonShell
  let options = {
    pythonPath:
      "C:/Users/Rylen/AppData/Local/Programs/Python/Python311/python.exe",
    pythonOptions: ["-u"],
    scriptPath:
      "C:\\Users\\Rylen\\Desktop\\Projects\\EventHorizon\\server_event_horizon", // Path to the directory containing your Python script
    args: [req.file.path],
  };

  let data = [];
  // Run Python script
  PythonShell.run("sfit_id_updated.py", options)
    .then((messages) => {
      // results is an array consisting of messages collected during execution
      data.push(JSON.parse(messages[2]));
      data.push(JSON.parse(messages[3]));
      data.push(JSON.parse(messages[4]));

      res.json(data); // send the data as the response
    })
    .catch((err) => {
      res.status(500).json({ error: err.message }); // send any errors
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
