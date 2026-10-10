
const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

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

    const hotelRecord = await Hotel.findById(hotel);

    if (!hotelRecord) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found.",
      });
    }

    const nights = Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) /
        (1000 * 60 * 60 * 24)
    );

    const roomPrice = Number(hotelRecord.pricePerNight);
    const taxes = 2500 * Number(rooms);
    const total = roomPrice * Number(rooms) * nights + taxes;

    const booking = await Booking.create({
      hotel,
      guestName,
      email,
      phone,
      checkIn,
      checkOut,
      guests: Number(guests),
      rooms: Number(rooms),
      notes: notes || "",
      roomPrice,
      taxes,
      total,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not create booking.",
      error: error.message,
    });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("hotel")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not fetch bookings.",
      error: error.message,
    });
  }
});


 // Confirm a booking
router.put("/:id/confirm", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled booking ko confirm nahi kar sakte.",
      });
    }

    booking.status = "Confirmed";
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking successfully confirmed!",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Booking confirm nahi ho saki.",
      error: error.message,
    });
  }
});


// Cancel a booking
router.put("/:id/cancel", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled.",
      });
    }

    booking.status = "Cancelled";
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully.",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not cancel booking.",
      error: error.message,
    });
  }
});

module.exports = router;
