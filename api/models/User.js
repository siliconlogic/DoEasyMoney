const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  { autoCreate: true }
);

const User = mongoose.model("users", schema);
module.exports = User;
