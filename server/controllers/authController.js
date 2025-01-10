const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  console.log(req.body);
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const validateToken = (req, res) => {
  try {
    // The `authMiddleware` has already verified the token and attached `req.user`.
    const user = req.user;

    if (!user) {
      return res
        .status(400)
        .json({ message: "User information not found in the token." });
    }

    // Respond with the user details from the token
    res.status(200).json({
      message: "Token is valid.",
      user // Contains decoded JWT payload
    });
  } catch (error) {
    console.error("Error validating token:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { registerUser, loginUser, validateToken };
