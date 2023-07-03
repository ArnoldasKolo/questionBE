const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
    INSERT_ANSWER,
    GET_ANSWERS,
    GET_ANSWER,
} = require("../controllers/answer");

router.post("/answer",authMiddleware,  INSERT_ANSWER);
router.get("/answers", GET_ANSWERS);
router.get("/answer/:id", GET_ANSWER);




module.exports = router;