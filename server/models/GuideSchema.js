const mongoose = require("mongoose");

const GuideSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: {
    type: String,
    required: true,
    maxlength: 500, // Optional: Limit the length of the bio
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
  },
  languages: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 0; // Ensure at least one language is provided
      },
      message: "A guide must speak at least one language.",
    },
  },
  contact: {
    phone: {
      type: String,
      required: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number"], // E.164 format validation
    },
  },
});

// Create a Mongoose model
const Guide = mongoose.model("Guide", GuideSchema);

module.exports = Guide;
