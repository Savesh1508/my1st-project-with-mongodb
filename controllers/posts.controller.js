const { errorHandler } = require("../helpers/error_handler");
const Posts = require("../models/posts");

const addPost = async (req, res) => {
  try {
    const { title, post_text, author, name, age, gender, email } = req.body;
    if (title == "" || post_text == "" || author == "" || name == "" || age == "" || email == "") {
      return res.status(400).send({ message: "Ma`lmotlarni to`liq yuboring!" });
    }
    const post_title = await Posts.findOne({ title: title });
    if (post_title) {
      return (res.status(400).send = { message: "Bunday sarlavha mavjud" });
    }
    const newPost = await Posts({
      title: title,
      post_text: post_text,
      author: author,
    });

    await newPost.save();
    res.status(200).send({ message: "Post qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find({});
    if (!posts) {
      return res.status(400).send({ message: "Posts not found" });
    }
    res.json({ posts });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Posts.find({ _id: id });
    if (!post) {
      return res.status(400).send({ message: "Post not found" });
    }
    res.json({ post });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const { title, post_text, author } = req.body;

  try {
    const update = await Posts.updateOne({ _id: id }, [
      { $set: { title: title, post_text: post_text, author: author } },
    ]);
    res.json({ update });
  } catch (error) {
    console.log(error);
  }
};

const loginPost = async (req, res) => {
  try {
    //LoginPosts
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addPost,
  getPosts,
  getPostById,
  loginPost,
  updatePost,
};
