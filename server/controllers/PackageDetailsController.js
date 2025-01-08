const {
  Package,
  PackageWithImages
} = require("../models/PackageDetailsSchema");

const getAllPackages = async (_, res) => {
  try {
    // Fetch all packages
    const packages = await Package.find();

    // Fetch the first image for each package
    const packagesWithImages = await Promise.all(
      packages.map(async (pkg) => {
        // Find the first image URL for the package
        const packageImages = await PackageWithImages.findOne({
          package_id: pkg._id
        });
        const firstImageUrl = packageImages?.image_urls[0] || null; // Get the first image or null if none

        return {
          ...pkg.toObject(), // Convert Mongoose document to plain object
          image: firstImageUrl
        };
      })
    );

    // Respond with the combined data
    res.json(packagesWithImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get package details by ID
const getPackageById = async (req, res) => {
  try {
    const packageId = req.params.id;

    // Fetch the package details
    const packageDetails = await Package.findById(packageId);
    if (!packageDetails) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Fetch all images associated with the package
    const packageImages = await PackageWithImages.findOne({
      package_id: packageId
    });
    const allImages = packageImages ? packageImages.image_urls : [];

    // Combine package details with images
    const packageWithImages = {
      ...packageDetails.toObject(), // Convert Mongoose document to plain object
      images: allImages
    };

    res.json(packageWithImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllPackages, getPackageById };
