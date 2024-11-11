const express = require("express");
const cors = require("cors");
const parkingRoutes = require("./routes/parkingRoutes");

const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON bodies

app.use("/api/parkingspots", parkingRoutes); // Mount parking routes

module.exports = app;
