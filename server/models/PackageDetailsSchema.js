const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String],
  price: Number,
  availableDates: [String],
  guides: [
    {
      id: String,
      name: String,
      profilePicture: String,
      rating: Number,
    },
  ],
});

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
