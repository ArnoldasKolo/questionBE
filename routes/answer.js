const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
    INSERT_POST,
    UPDATE_POST,
    DELETE_POST,
    GET_POSTS,
    GET_POST,
} = require("../controllers/post");

router.post("/post",authMiddleware,  INSERT_POST);
router.get("/posts", GET_POSTS);
router.get("/post/:id", GET_POST);
router.put("/post/update/:id", authMiddleware,UPDATE_POST);
router.delete("/deletePost/:id",DELETE_POST);




module.exports = router;