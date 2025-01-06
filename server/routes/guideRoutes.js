const express = require("express");
const {
  getAllGuides,
  getAllReviewsForGuide,
  createReview
} = require("../controllers/guideController");

const router = express.Router();
// Routes
router.get("/", getAllGuides);

// Review Routes
router.post("/review", createReview); // Create a new review
router.get("/review/:guideId", getAllReviewsForGuide); // Get all reviews for a specific guide
// router.put("/review/:reviewId", updateReview); // Update an existing review
// router.delete("/review/:reviewId", deleteReview); // Delete a review
module.exports = router;
