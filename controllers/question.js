const UserModel = require("../models/user");
const QuestionModel = require("../models/question");

const uniqid = require("uniqid");

module.exports.INSERT_QUESTION = async (req, res) => {
  try{
    const question = new QuestionModel({
      id: uniqid(),
      question: req.body.question,
      description: req.body.description,
      answers: [],
    });
  
    const savedQuestion = await question.save();
  
    UserModel.updateOne(
      { id: req.body.userId },
      { $push: { createdQuestions: savedQuestion.id } }
    ).exec();
  
    res.status(200).json({ response: savedQuestion.id });
  }catch(err){
    res.status(500).json({ response: "All fields needs to be filled" })
  }
};

module.exports.GET_QUESTIONS = async (req, res) => {
  const questions = await QuestionModel.find();
  res.status(200).json({ questions: questions });
};

module.exports.GET_QUESTION = async (req, res) => {
  try {
    const question = await QuestionModel.findOne({ id: req.params.id });
    res.status(200).json({ question: question });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "ERROR, please try later" });
  }
};



module.exports.DELETE_QUESTION = async (req, res) => {
  await QuestionModel.deleteOne({ id: req.params.id });
  res.status(200).json({ response: "Question was deleted" });
};

module.exports.GET_QUESTION_ANSWERS = async (req, res) => {
  try {
    const aggregatedAnswers = await QuestionModel.aggregate([
      {
        $lookup: {
          from: "answer",
          localField: "answers",
          foreignField: "id",
          as: "answers",
        },
      },
      { $match: { id: req.params.id } },
    ]).exec();

    res.status(200).json({ posts: aggregatedAnswers });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "ERROR, please try later" });
  }
};