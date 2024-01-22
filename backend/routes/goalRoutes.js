const express = require("express");
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controller/goalController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

//We can refactor it like this
//router.route("/").get(getGoals).post(setGoals)
//router.route("/").put(updateGoals).delete(deleteGoal)

router.get("/", protect, getGoals); //Protected
router.post("/", protect, setGoal);
router.put("/:id", protect, updateGoal);
router.delete("/:id", protect, deleteGoal);

module.exports = router;
