const express = require("express");
const {
  createNewBooking,
  updateBooking,
  getMyBookings,
} = require("../controllers/bookingController");
const router = express.Router();

router.post("/", createNewBooking);
// Route to update a booking
router.put("/:bookingId", updateBooking);
// Route to get bookings for a specific user
router.get("/", getMyBookings);

module.exports = router;
