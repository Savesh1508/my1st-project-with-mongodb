const express = require("express");
const {
  addPost,
  getPosts,
  getPostById,
  updatePost,
} = require("../controllers/posts.controller");

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPostById);

router.post("/", addPost);

router.put("/:id", updatePost);
// router.use("/login",loginUser);

module.exports = router;
