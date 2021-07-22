const path = require("path");

const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

// This middleware is used to enable Cross Origin Resource Sharing This sets Headers to allow access to our client application
app.use(cors());

// Storage Engin That Tells/Configures Multer for where (destination) and how (filename) to save/upload our files
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

//app.get("/", (req, res) => {
 // res.sendFile(path.join(__dirname, "index.html"));
//});

// The Multer Middleware that is passed to routes that will receive income requests with file data (multipart/formdata)
const upload = multer({ storage: fileStorageEngine });

//Handles only one image 
app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single FIle upload success");
});


app.listen(5555); 

