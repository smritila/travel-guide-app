const express = require("express");
const { importTourPackages } = require("../controllers/importController");
const {
  linkImagesToMongoDB,
  formatAndRenameS3Images
} = require("../controllers/importImageFromAwsController");
const router = express.Router();

router.post("/tour-package", importTourPackages);
router.post("/link-images", linkImagesToMongoDB);

module.exports = router;
