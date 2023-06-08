const { errorHandler } = require("../helpers/error_handler");
const mongoose = require('mongoose');
const User = require("../models/user");

const addUser = async (req, res) => {
  try {
    const { name, email, password, age, jinsi, wife, isMarried, phone, salary} = req.body;
    if (name == "" || email == "" || password == "" || age == "" || jinsi == "") {
      return res.status(400).send({ message: "Ma`lmotlarni to`liq yuboring!" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return (res.status(400).send = { message: "Bunday email mavjud" });
    }

    const newUser = await User({
      name, //name: name,
      email,
      password,
      age,
      jinsi,
      isMarried,
      wife,
      phone,
      salary
    });

    // await newUser.validate();
    await newUser.save();

    res.status(200).send({ message: "Foydalanuvchi qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    //getUsers
    const users = await User.find({});
    if (!users) {
      return res.status(400).send({ message: "Users not found" });
    }
    res.json({ users });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUserById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorrect ID" });
    }

    const user = await User.findOne({_id: req.params.id});
    if(!user){
      return res.status(400).send({message: "Foydalanuvchi topilmadi"})
    }
    res.json({user})
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUserByName = async (req, res) => {
  try {
    // const user = await User.findByName(req.params.name);
    const user = await User.find().byName(req.params.name);

    if(!user){
      return res.status(400).send({message: "Foydalanuvchi topilmadi"})
    }
    res.json({user})
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  try {
    const update = await User.updateOne({ _id: id }, [
      { $set: { name: name, email: email, password: password } },
    ]);
    res.json({ update });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    //LoginUser
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  loginUser,
  updateUser,
  getUserByName
};
