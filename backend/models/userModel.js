const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  description: String,
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
