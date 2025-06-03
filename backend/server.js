const express = require("express");
const cors = require("cors");
const connectMongo = require("../backend/config/db");
const codeRoutes = require("../backend/routes/codeRoutes");

// initialize app + connect DB
const app = express();
connectMongo();

// Middleware
app.use(cors({
  origin: "*", // for testing; restrict to frontend domain in production
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());


// define router for this route
app.use("/api", codeRoutes);


// Start server
const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
