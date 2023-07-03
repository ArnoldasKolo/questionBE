const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  id: { type: String, required: true, min: 7 },
  answer: { type: String, required: true },
  likes: { type: Array, required: false },
});

module.exports = mongoose.model("Answer", answerSchema);