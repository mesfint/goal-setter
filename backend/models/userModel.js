const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a name value"],
    },
    email: {
      type: String,
      require: [true, "Please add a email value"],
      unique: true,
    },
    password: {
      type: String,
      
      require: [true, "Please add a password value"],
    },
  },
  {
    timestamps: true,
  }
);

//Middleware for mongodb
//Before the doc is updated we need to check if the password is modified
usersSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
