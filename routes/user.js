const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { 
  LOGIN,
  SIGNUP,
  GET_USER_BY_ID,
  GET_ALL_USERS_QUESTIONS,
  GET_ALL_USERS_ANSWERS
} = require("../controllers/user");

router.post("/signUp", SIGNUP);
router.post("/logIn", LOGIN);
router.get("/user/:id", GET_USER_BY_ID);
router.get("/AllUsersQuestions",authMiddleware, GET_ALL_USERS_QUESTIONS);
router.get("/AllUsersAnswers",authMiddleware, GET_ALL_USERS_ANSWERS);

module.exports = router;