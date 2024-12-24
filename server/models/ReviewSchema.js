const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  rating: { type: Number, min: 1, max: 5, required: true },
  comments: { type: String, required: true },
});

module.exports = ReviewSchema;
