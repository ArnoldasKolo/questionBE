const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: { type: String, required: true, min: 3 },
  username: { type: String, required: true, min: 3 },
  email: { type: String, required: true, min: 8 },
  password: { type: String, required: true, min: 6 },
  createdQuestions:{ type: Array, required: false },
  createdAnswers:{ type: Array, required: false },
});

module.exports = mongoose.model("User", userSchema);