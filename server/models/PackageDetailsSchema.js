const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  state_name: { type: String, required: true },
  place_name: { type: String, required: true },
  price: { type: Number, required: true },
  title: { type: String, required: true },
  highlights: { type: [String], required: true },
  description: { type: String, required: true },
  includes: { type: [String], required: true },
});

// Create a Mongoose model
const Package = mongoose.model("Package", PackageSchema);

module.exports = Package;
