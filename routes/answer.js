const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
    INSERT_ANSWER,
    GET_ANSWERS,
    GET_ANSWER,
    UPDATE_ANSWER,
    DELETE_ANSWER,
} = require("../controllers/post");

router.post("/answer",authMiddleware,  INSERT_ANSWER);
router.get("/answers", GET_ANSWERS);
router.get("/answer/:id", GET_ANSWER);
router.put("/answer/update/:id", authMiddleware,UPDATE_ANSWER);
router.delete("/deleteAnswer/:id",DELETE_ANSWER);




module.exports = router;