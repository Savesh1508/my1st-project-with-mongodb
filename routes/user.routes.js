const express = require("express");
const {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  getUserByName
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.get("/name/:name", getUserByName);

router.post("/", addUser);

router.put("/:id", updateUser);
// router.use("/login",loginUser);

module.exports = router;
