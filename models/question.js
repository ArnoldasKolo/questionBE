const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  id: { type: String, required: true, min: 7 },
  question: { type: String, required: true },
  description: { type: String, required: true },
  answers: { type: Array, required: false },
});

module.exports = mongoose.model("Question", questionSchema);