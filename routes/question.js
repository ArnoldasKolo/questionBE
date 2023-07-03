const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
    INSERT_QUESTION,
    GET_QUESTIONS,
    GET_QUESTION,
    UPDATE_QUESTION,
    DELETE_QUESTION,
} = require("../controllers/post");

router.post("/question",authMiddleware,  INSERT_QUESTION);
router.get("/questions", GET_QUESTIONS);
router.get("/question/:id", GET_QUESTION);
router.get("/question/answers/:id", GET_QUESTION_ANSWERS);
router.delete("/deletePost/:id",DELETE_QUESTION);




module.exports = router;