const UserModel = require("../models/user");
const AnswerModel = require("../models/answer");
const QuestionModel = require("../models/question");
const uniqid = require("uniqid");

module.exports.INSERT_ANSWER = async (req, res) => {
  try{
    const answer = new AnswerModel({
      id: uniqid(),
      answer: req.body.answer,
      likes: [],
    });
  
    const savedAnswer = await answer.save();
  
    QuestionModel.updateOne(
      { id: req.params.id },
      { $push: { answers: savedAnswer.id } }
    ).exec();
  
    res.status(200).json({ response: savedAnswer.id });
  }catch(err){
    res.status(500).json({ response: "All fields needs to be filled" })
  }
};

module.exports.GET_ANSWERS = async (req, res) => {
  const answers = await AnswerModel.find();
  res.status(200).json({ answers: answers });
};

module.exports.GET_ANSWER = async (req, res) => {
  try {
    const answer = await AnswerModel.findOne({ id: req.params.id });
    res.status(200).json({ answer: answer });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "ERROR, please try later" });
  }
};
