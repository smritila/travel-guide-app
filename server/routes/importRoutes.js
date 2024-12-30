const express = require("express");
const { importTourPackages } = require("../controllers/importController");
const router = express.Router();

router.post("/tour-package", importTourPackages);

module.exports = router;
