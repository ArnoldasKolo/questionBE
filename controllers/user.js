const uniqid = require("uniqid");
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.LOGIN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ response: "Bad email or password" });
    }

    bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
      if (isPasswordMatch) {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user.id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2h" },
          {
            algorithm: "RS256",
          }
        );

        return res
          .status(200)
          .json({ response: "You logged in", token, userId: user.id });
      } else {
        return res.status(404).json({ response: "bad email or password" });
      }
    });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "ERROR, please try later" });
  }
};

module.exports.SIGNUP = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(404)
        .json({ response: "User with this email already exists" });
    }

    if (!req.body.email.includes("@")) {
      return res.status(400).json({ response: "Invalid email format" });
    }

    const password = req.body.password;
    if (!/\d/.test(password)) {
      return res
        .status(400)
        .json({ response: "Password must contain at least one number" });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        const user = new UserModel({
          id: uniqid(),
          username: req.body.username,
          email:req.body.email,
          password: hash,
          phone:req.body.phone,
          createdPosts: [],
          createdAnswers: [],
        });

        await user.save();
        res.status(200).json({ response: "User was saved successfully" });
      });
    });
  } catch (err) {
    res.status(500).json({ response: "User was not saved, please try later" });
  }
};

module.exports.GET_ALL_USERS_QUESTIONS = async (req, res) => {
  try {
    const aggregatedQuestions = await UserModel.aggregate([
      {
        $lookup: {
          from: "questions",
          localField: "createdQuestions",
          foreignField: "id",
          as: "createdQuestions",
        },
      },
      { $match: { id: req.body.userId } },
    ]).exec();

    res.status(200).json({ user: aggregatedQuestions });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "ERROR, please try later" });
  }
};

module.exports.GET_ALL_USERS_ANSWERS = async (req, res) => {
  try {
    const aggregatedAnswers = await UserModel.aggregate([
      {
        $lookup: {
          from: "answers",
          localField: "createdAnswers",
          foreignField: "id",
          as: "createdAnswers",
        },
      },
      { $match: { id: req.body.userId } },
    ]).exec();

    res.status(200).json({ user: aggregatedAnswers });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "ERROR, please try later" });
  }
};

module.exports.GET_USER_BY_ID = async (req, res) => {
  try {
    const user = await UserModel.findOne({ id: req.params.id });
    res.status(200).json({ user: user });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "ERROR, please try later" });
  }
};


