const UserModel = require("../models/user");
const QuestionModel = require("../models/question");

const uniqid = require("uniqid");

module.exports.INSERT_QUESTION = async (req, res) => {
  try{
    const post = new QuestionModel({
      id: uniqid(),
      question: req.body.question,
      description: req.body.description,
      answers: [],
    });
  
    const savedPost = await post.save();
  
    UserModel.updateOne(
      { id: req.body.userId },
      { $push: { createdPosts: savedPost.id } }
    ).exec();
  
    res.status(200).json({ response: savedPost.id });
  }catch(err){
    res.status(500).json({ response: "All fields needs to be filled" })
  }
};

module.exports.GET_POSTS = async (req, res) => {
  const posts = await PostModel.find();
  res.status(200).json({ posts: posts });
};

module.exports.GET_POST = async (req, res) => {
  try {
    const post = await PostModel.findOne({ id: req.params.id });
    res.status(200).json({ post: post });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "ERROR, please try later" });
  }
};

module.exports.UPDATE_POST = async (req, res) => {
  await TruckModel.updateMany(
    { id: req.params.id },
    {
      $set: {
        title: req.body.title,
        console: req.body.console,
        form: req.body.form,
        price: req.body.price,
        description: req.body.description,
      },
    }
  );
  res.status(200).json({ response: "Finished filling" });
};

module.exports.DELETE_POST = async (req, res) => {
  await PostModel.deleteOne({ id: req.params.id });
  res.status(200).json({ response: "Post was deleted" });
};

module.exports.GET_ALL_POST_SERVICES = async (req, res) => {
  try {
    const aggregatedServices = await PostModel.aggregate([
      {
        $lookup: {
          from: "services",
          localField: "services",
          foreignField: "id",
          as: "services",
        },
      },
      { $match: { id: req.params.id } },
    ]).exec();

    res.status(200).json({ posts: aggregatedServices });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "ERROR, please try later" });
  }
};