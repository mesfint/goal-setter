const asyncHandler = require("express-async-handler");

//@desc         Get goals
//@route        GET /api/goals
//@access       Private
//async         When we interact with db, its asynchronous communication, so we use asyc in all controller
//syncHandler   Wrap all the async controllers inside asyncHandler
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "All goals are here" });
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
  res.status(200).json({ message: "Set a new goal" });
});
//@desc         Update goals
//@route        PUT /api/goals/:id
//@access       Private
//async         When we interact with db, its asynchronous communication, so we use asyc in all controller

const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update a goal ${req.params.id}` });
});
//@desc         Delete goals
//@route        DELETE /api/goals/:id
//@access       Private
//async         When we interact with db, its asynchronous communication, so we use asyc in all controller

const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete a goal, ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoal,
};
