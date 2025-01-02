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
  attraction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attraction",
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

module.exports = BookingSchema;
