const mongoose = require("mongoose");

const goalsSchema = mongoose.Schema(
  {
    text: {
      type: String,
      require: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

const Goal = mongoose.model("Goal", goalsSchema);

module.exports = Goal;
