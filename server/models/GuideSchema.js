const mongoose = require("mongoose");

const GuideSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  bio: {
    type: String,
    required: true,
    maxlength: 500 // Optional: Limit the length of the bio
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  languages: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 0; // Ensure at least one language is provided
      },
      message: "A guide must speak at least one language."
    }
  },
  contact: {
    phone: {
      type: String,
      required: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number"] // E.164 format validation
    }
  }
});

// Create a Mongoose model
const Guide = mongoose.model("Guide", GuideSchema);

//Create new guide review schema here

const GuideReviewSchema = new mongoose.Schema({
  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },
  guide_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1, // Assuming rating scale is 1 to 5
    max: 5,
    validate: {
      validator: function (v) {
        return Number.isInteger(v); // Ensure the rating is an integer
      },
      message: "Rating must be an integer between 1 and 5."
    }
  },
  review: {
    type: String,
    required: true,
    maxlength: 1000 // Optional: Limit the review length
  },
  date: {
    type: Date,
    required: true,
    default: Date.now // Automatically set to current date
  }
});

const GuideReview = mongoose.model("GuideReview", GuideReviewSchema);

module.exports = { Guide, GuideReview };
