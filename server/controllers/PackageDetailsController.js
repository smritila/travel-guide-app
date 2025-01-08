const Package = require("../models/PackageDetailsSchema");

// Get all packages
const getAllPackages = async (req, res) => {
  console.log(req.body);
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get package details by ID
const getPackageById = async (req, res) => {
  try {
    const packageId = req.params.id;
    const packageDetails = await Package.findById(packageId);
    if (!packageDetails) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(packageDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { getAllPackages, getPackageById };
