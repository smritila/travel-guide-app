const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  state_name: { type: String, required: true },
  place_name: { type: String, required: true },
  price: { type: Number, required: true },
  title: { type: String, required: true },
  highlights: { type: [String], required: true },
  description: { type: String, required: true },
  includes: { type: [String], required: true }
});

// Create a Mongoose model
const Package = mongoose.model("Package", PackageSchema);

// Define the new schema
const PackageWithImagesSchema = new mongoose.Schema({
  package_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: true
  }, // Reference to the Package model
  image_urls: { type: [String], required: true }, // Array of image URLs
  created_at: { type: Date, default: Date.now }, // Timestamp for when the record is created
  updated_at: { type: Date, default: Date.now } // Timestamp for when the record is updated
});

// Create a Mongoose model
const PackageWithImages = mongoose.model(
  "PackageWithImages",
  PackageWithImagesSchema
);

module.exports = { Package, PackageWithImages };
