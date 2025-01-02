const express = require("express");
const { getAllGuides } = require("../controllers/guideController");

const router = express.Router();
// Routes
router.get("/", getAllGuides);
module.exports = router;
