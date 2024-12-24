const mongoose = require("mongoose");
const GuideSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "true",
  },
  bio: { type: [String], required: true },
  availability: { Type: Object, required: true },
});
module.exports = GuideSchema;
