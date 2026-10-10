
const express = require("express");
const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

const router = express.Router();

// Create a new booking
router.post("/", async (req, res) => {
  try {
    const {
      hotel,
      guestName,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      rooms,
      notes,
    } = req.body;

    if (
      !hotel ||
      !guestName ||
      !email ||
      !phone ||
      !checkIn ||
      !checkOut ||
      !guests ||
      !rooms
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required booking details.",
      });
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      return res.status(400).json({
        success: false,
        message: "Check-out must be after check-in.",
      });
    }

    const selectedHotel = await Hotel.findById(hotel);

    if (!selectedHotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found.",
      });
    }

    const nights = Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) /
        (1000 * 60 * 60 * 24)
    );

    const roomCount = Number(rooms);
    const roomPrice = selectedHotel.pricePerNight;
    const taxes = 2500 * roomCount;
    const total = roomPrice * roomCount * nights + taxes;

    const booking = await Booking.create({
      hotel: selectedHotel._id,
      guestName,
      email,
      phone,
      checkIn,
      checkOut,
      guests: Number(guests),
      rooms: roomCount,
      notes: notes || "",
      roomPrice,
      taxes,
      total,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not create booking.",
    });
  }
});

// Get all bookings from MongoDB, including hotel details
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("hotel")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not fetch bookings.",
    });
  }
});

module.exports = router;