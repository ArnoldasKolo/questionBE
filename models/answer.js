const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  id: { type: String, required: true, min: 7 },
  title: { type: String, required: true },
  console: { type: String, required: true },
  form: { type: String, required: true },
  price:{ type: Number, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  written_by: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);