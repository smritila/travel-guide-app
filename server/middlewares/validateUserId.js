const validateUserId = (req, res, next) => {
  const jwtUserId = req.user?.id; // Extract userId from JWT payload
  const queryUserId = req.query.userId; // Extract userId from query parameters

  // Ensure both userId values exist
  if (!jwtUserId || !queryUserId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  // Check if the userId matches
  if (jwtUserId !== queryUserId) {
    return res
      .status(403)
      .json({ message: "Unauthorized: User ID does not match." });
  }

  next(); // Proceed to the next middleware or route
};

module.exports = validateUserId;
