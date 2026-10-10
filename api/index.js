
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../backend/config/db");
const hotelRoutes = require("../backend/routes/hotelRoutes");
const bookingRoutes = require("../backend/routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StaySphere Backend is running!",
  });
});

app.use("/api/hotels", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
}, hotelRoutes);

app.use("/api/bookings", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
}, bookingRoutes);

module.exports = app;
