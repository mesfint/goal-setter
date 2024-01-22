const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controller/userController");

const router = express.Router();

//We can refactor it like this
//router.route("/").get(getGoals).post(setGoals)
//router.route("/").put(updateGoals).delete(deleteGoal)

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
