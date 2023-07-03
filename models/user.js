const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: { type: String, required: true, min: 3 },
  username: { type: String, required: true, min: 3 },
  email: { type: String, required: true, min: 8 },
  password: { type: String, required: true, min: 6 },
  phone:{ type: Number, required: true},
  createdPosts:{ type: Array, required: false },
});

module.exports = mongoose.model("User", userSchema);