
const express = require("express");
const router = express.Router();

const Hotel = require("../models/Hotel");

// GET: Sab hotels hasil karo
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();

    res.status(200).json({
      success: true,
      count: hotels.length,
      hotels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hotels hasil nahi ho sake.",
      error: error.message,
    });
  }
});


 // POST: Naya hotel database mein save karo
router.post("/", async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Hotel successfully add ho gaya!",
      hotel,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Hotel add nahi ho saka.",
      error: error.message,
    });
  }
});

// GET: Ek hotel ID se hasil karo
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel nahi mila.",
      });
    }

    res.status(200).json({
      success: true,
      hotel,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Hotel ID invalid hai.",
    });
  }
});

module.exports = router;