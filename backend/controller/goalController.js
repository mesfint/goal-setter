const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModal");

//@desc         Get goals
//@route        GET /api/goals
//@access       Private
//async         When we interact with db, its asynchronous communication, so we use asyc in all controller
//syncHandler   Wrap all the async controllers inside asyncHandler
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  //res.status(200).json({ message: "All goals are here" });
  res.status(200).json(goals);
});
//@desc         Set goals
//@route        post /api/goals
//@access       Private
//async         When we interact with db, its asynchronous communication, so we use asyc in all controller

const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    //Express error handler
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({ text: req.body.text });
  //await Goal.save(goal);
  //res.status(200).json({ message: "Set a new goal" });
  res.status(200).json(goal);
});
//@desc         Update goals
//@route        PUT /api/goals/:id
//@access       Private
//async         When we interact with db, its asynchronous communication, so we use asyc in all controller

const updateGoals = asyncHandler(async (req, res) => {
  const existingGoal = await Goal.findById(req.params.id);
  if (!existingGoal) {
    res.status(400);
    throw new Error("Goal not found");
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
  const existingGoal = await Goal.findById(req.params.id);
  if (!existingGoal) {
    res.json(400);
    throw new Error("Goal not found");
  }
  const deleteGoal = await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoal,
};
