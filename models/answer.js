const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  id: { type: String, required: true, min: 7 },
  answer: { type: String, required: true },
  likes: { type: Number, required: false },
  written_by: { type: String, required: true },
});

module.exports = mongoose.model("Answer", answerSchema);