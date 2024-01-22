const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc         Register a new user
//@route        post /api/users
//@access       Public
//async         When we interact with db, its asynchronous communication, so we use asyc in all controller

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if required fields are provided
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400);
    throw new Error("User is already existed");
  }

  // Create a new user and save it to the database
  const newUser = new User({ name, email, password });
  await newUser.save();

  // Generate and set token to cookies
  const token = generateToken(newUser._id);
  res.cookie("user_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000,
  });

  res.status(201).json({ newUser });
});

//@desc         Login User
//@route        GET /api/users/login
//@access       Public
//async         When we interact with db, its asynchronous communication, so we use asyc in all controller
//syncHandler   Wrap all the async controllers inside asyncHandler
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate token
    const token = generateToken(user._id);
    res.json({ user, token });
  } else {
    res.status(400).json({ error: "Invalid credentials" });
  }
});

//@desc         Get  User data
//@route        GET /api/users/me
//@access       Private
//async         When we interact with db, its asynchronous communication, so we use asyc in all controller
//syncHandler   Wrap all the async controllers inside asyncHandler
const getMe = asyncHandler(async (req, res) => {
  //const user = await User.findById({ id: req.params.id });
  //res.status(200).json({ message: "All users are here" });
  //console.log("getMe.user", req.user);
  //req.user.id => has whatever user who is authenticated

  const { _id, name, email } = await User.findById(req.user.id);
  //res.status(200).json(req.user);
  //OR
  //Since we need only this data not the whole(req.user)
  //This out put is usefulll for frontend
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe, 
};
