const { Guide, GuideReview } = require("../models/GuideSchema");
//const GuideReview = require("../models/GuideReviewSchema");

const getAllGuides = async (req, res) => {
  try {
    // Fetch all guides and populate user data
    const guides = await Guide.find()
      .populate({
        path: "user_id",
        select: "name email" // Only include name and email from User schema
      })
      .exec();

    // Get all guide IDs
    const guideIds = guides.map((guide) => guide._id);

    // Aggregate average rating and review count for each guide
    const reviews = await GuideReview.aggregate([
      { $match: { guide_id: { $in: guideIds } } },
      {
        $group: {
          _id: "$guide_id",
          averageRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 }
        }
      }
    ]);

    // Create a map for quick lookup of reviews data
    const reviewsMap = reviews.reduce((map, review) => {
      map[review._id.toString()] = {
        averageRating: review.averageRating,
        reviewCount: review.reviewCount
      };
      return map;
    }, {});

    // Prepare the final guide list with combined data
    const guideList = guides.map((guide) => {
      const reviewData = reviewsMap[guide._id.toString()] || {
        averageRating: 0,
        reviewCount: 0
      };
      return {
        id: guide._id,
        name: guide.user_id?.name || "Unknown",
        email: guide.user_id?.email || "Unknown",
        bio: guide.bio,
        experience: guide.experience,
        languages: guide.languages,
        phone: guide.contact.phone,
        averageRating: reviewData.averageRating,
        reviewCount: reviewData.reviewCount
      };
    });

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
        select: "date user_id" // Optionally populate related Booking data
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
      booking_id
    });

    await newReview.save();
    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getAllGuides,
  getAllReviewsForGuide,
  createReview
};
