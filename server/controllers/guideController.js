const Guide = require("../models/GuideSchema");
//const GuideReview = require("../models/GuideReviewSchema");

const getAllGuides = async (req, res) => {
  try {
    // Query the Guides collection and populate the related User data
    const guides = await Guide.find()
      .populate({
        path: "user_id",
        select: "name email", // Only include name and email from User schema
      })
      .exec();

    // Prepare the final list with combined data
    const guideList = guides.map((guide) => ({
      id: guide._id,
      name: guide.user_id?.name || "Unknown",
      email: guide.user_id?.email || "Unknown",
      bio: guide.bio,
      experience: guide.experience,
      languages: guide.languages,
      phone: guide.contact.phone,
    }));

    res.json({ success: true, data: guideList });
  } catch (error) {
    console.error("Error fetching guides:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllReviewsForGuide = async (req, res) => {
  try {
    const { guideId } = req.params;

    // Fetch all reviews for a specific guide
    const reviews = await GuideReview.find({ guide_id: guideId })
      .populate({
        path: "booking_id",
        select: "date user_id", // Optionally populate related Booking data
      })
      .exec();

    res.json({ success: true, data: reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createReview = async (req, res) => {
  try {
    const { guide_id, rating, review, booking_id } = req.body;

    // Validate required fields
    if (!guide_id || !rating || !review || !booking_id) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Create a new review
    const newReview = new GuideReview({
      guide_id,
      rating,
      review,
      booking_id,
    });

    await newReview.save();
    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, review } = req.body;

    // Update the review with the given ID
    const updatedReview = await GuideReview.findByIdAndUpdate(
      reviewId,
      { rating, review },
      { new: true } // Return the updated document
    );

    if (!updatedReview) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    res.json({ success: true, data: updatedReview });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Delete the review with the given ID
    const deletedReview = await GuideReview.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getAllReviewsForGuide,
  createReview,
  updateReview,
  deleteReview,
};

module.exports = { getAllGuides };
