const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { 
  LOGIN,
  SIGNUP,
  GET_USER_BY_ID,
  GET_ALL_USERS_QUESTIONS
} = require("../controllers/user");

router.post("/signUp", SIGNUP);
router.post("/logIn", LOGIN);
router.get("/user/:id", GET_USER_BY_ID);
router.get("/AllUsersPosts",authMiddleware, GET_ALL_USERS_QUESTIONS);

module.exports = router;