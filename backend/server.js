const express = require("express");
const cors = require("cors");
const connectMongo = require("./config/db");
const codeRoutes = require("./routes/codeRoutes");

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

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start server
const port = process.env.SERVER_PORT;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
