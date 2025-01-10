const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  validateToken
} = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/validateToken", authMiddleware, validateToken);

module.exports = router;
