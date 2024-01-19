const express = require("express");
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoal,
} = require("../controller/goalController");

const router = express.Router();

//We can refactor it like this
//router.route("/").get(getGoals).post(setGoals)
//router.route("/").put(updateGoals).delete(deleteGoal)

router.get("/", getGoals);
router.post("/", setGoals);
router.put("/:id", updateGoals);
router.delete("/:id", deleteGoal);

module.exports = router;
