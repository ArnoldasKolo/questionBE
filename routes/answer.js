const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
    INSERT_ANSWER,
    GET_ANSWERS,
    GET_ANSWER,
    DELETE_ANSWER,
    LIKE,
    DISLIKE
} = require("../controllers/answer");

router.post("/question/:id/answer",authMiddleware,  INSERT_ANSWER);
router.get("/question/:id/answers", GET_ANSWERS);
router.get("/question/:id/answer", GET_ANSWER);
router.put("/like/:id",authMiddleware, LIKE);
router.put("/dislike/:id",authMiddleware, DISLIKE);
router.delete("/deleteAnswer/:id",DELETE_ANSWER);



module.exports = router;