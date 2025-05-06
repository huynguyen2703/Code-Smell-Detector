const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());



// Basic route for testing
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Routes for handling code snippets
const codeRoutes = require("./routes/code");
app.use("/api/code", codeRoutes);

// Start server
app.listen(5050, () => {
  console.log("Server running on port 5000");
});
