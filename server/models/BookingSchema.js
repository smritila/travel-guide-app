const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  guide_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
    required: true,
  },
  tourist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  package_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: ["NOT_COMPLETED", "COMPLETED"],
    required: true,
  },
});
const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
