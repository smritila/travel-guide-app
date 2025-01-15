const express = require("express");
const router = express.Router();

const {
  createNewBooking,
  updateBooking,
  getMyBookings
} = require("../controllers/bookingController");

const authMiddleware = require("../middlewares/authMiddleware");
// const validateUserId = require("../middlewares/validateUserId");

router.post("/", authMiddleware, createNewBooking);
// Route to update a booking
router.put("/:bookingId", authMiddleware, updateBooking);
// Route to get bookings for a specific user
router.get("/", authMiddleware, getMyBookings);

module.exports = router;
