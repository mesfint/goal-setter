const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModal");

//@desc         Get goals
//@route        GET /api/goals
//@access       Private
//async         When we interact with db, its asynchronous communication, so we use asyc in all controller
//syncHandler   Wrap all the async controllers inside asyncHandler
const getGoals = asyncHandler(async (req, res) => {
  //Reason we are accessing user in goals obj is b/c the relationship in the goals model
  //Instead of getting all goals we want to access a specific goal for a specific user
  //const goals = await Goal.find();
  //req.user.id => is to match the id due to the protect middleware
  const goals = await Goal.find({ user: req.user.id });
  //res.status(200).json({ message: "All goals are here" });
  res.status(200).json(goals);
});
//@desc         Set goals
//@route        post /api/goals
//@access       Private
//async         When we interact with db, its asynchronous communication, so we use asyc in all controller

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    //Express error handler
    throw new Error("Please add a text field");
  }
  //add user to be included in the goals body when we create a goal
  const goal = await Goal.create({ text: req.body.text, user: req.user.id });
  //await Goal.save(goal);
  //res.status(200).json({ message: "Set a new goal" });
  res.status(200).json(goal);
});
//@desc         Update goals
//@route        PUT /api/goals/:id
//@access       Private
//async         When we interact with db, its asynchronous communication, so we use asyc in all controller

const updateGoal = asyncHandler(async (req, res) => {
  const existingGoal = await Goal.findById(req.params.id);
  if (!existingGoal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);
  //check for user

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Make sure the logged in user matches the goal user / so that no other user updates others goals except the loggedin one
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }
  //create a new one if doesn't exist
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});
//@desc         Delete goals
//@route        DELETE /api/goals/:id
//@access       Private
//async         When we interact with db, its asynchronous communication, so we use asyc in all controller

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
