const express = require("express");
const {
  getAllPackages,
  getPackageById,
} = require("../controllers/PackageDetailsController");

const router = express.Router();
// Routes
router.get("/", getAllPackages);
router.get("/:id", getPackageById);
module.exports = router;
