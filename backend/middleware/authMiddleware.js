const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//Verify the existed token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if Authorization header is present and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract the token from the Authorization header
    token = req.headers.authorization.split(" ")[1];
    console.log("token-protect", token);
  }

  // If no token is found, return a 401 response
  if (!token) {
    return res.status(401);
    throw new Error("Not authorized, no token found");
  }

  try {
    // Verify the token and decode its payload
    //decode the encoded jwt to decoded
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database using the decoded user ID
    // Exclude the hashed password field from the user object
    //Get user from the token
    //wherever i use this middleware, i will have the access to req.user
    req.user = await User.findById(decoded.id).select("-password");
    console.log("DecodedID :", decoded.id);
    console.log("Found User-decoded:", req.user);

    // Continue to the next middleware
    next();
  } catch (error) {
    console.error(error);

    // If there's an error in token verification, return a 401 response
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = { protect };
