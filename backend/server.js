const bookingRoutes = require("./routes/bookingRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const hotelRoutes = require("./routes/hotelRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StaySphere Backend is running!",
  });
});

// Hotel API routes
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.listen(PORT, () => {
  console.log(`StaySphere backend running on http://localhost:${PORT}`);
});