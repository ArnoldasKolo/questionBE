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

router.post("/post",authMiddleware,  INSERT_QUESTION);
router.get("/posts", GET_QUESTIONS);
router.get("/post/:id", GET_QUESTION);
router.put("/post/update/:id", authMiddleware,UPDATE_QUESTION);
router.delete("/deletePost/:id",DELETE_QUESTION);




module.exports = router;