const Guide = require("../models/GuideSchema");

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

module.exports = { getAllGuides };
