const express = require("express");

const userRoutes = require("./user.routes.js");
const postsRoutes = require("./posts.routes.js");

const router = express.Router();

router.use("/api/user", userRoutes);

router.use("/api/posts", postsRoutes);


module.exports = router;
