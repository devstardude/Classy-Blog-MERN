const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../models/httpError");
const Post = require("../models/Post");
//------Get All Posts
const getPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching posts failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

//------Get Single Posts
const getSinglePost = async (req, res, next) => {
  const postId = req.params.pId;
  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      "Fetching post failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ post: post.toObject({ getters: true }) });
};

// User's Post
const myPosts = async (req, res, next) => {
  const userId = req.params.uId;
  let userPosts;
  try {
    userPosts = await Post.find({ userId: userId }).sort({ _id: -1 });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find post.",
      500
    );
    return next(error);
  }
  res.status(200).json({
    userPosts: userPosts.map((userPost) =>
      userPost.toObject({ getters: true })
    ),
  });
};

//Create Post
const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, content,image } = req.body;
  const createdPost = new Post({
    title,
    description,
    content,
    time: String(new Date().toDateString()),
    image: image,
    username: req.userData.name,
    email: req.userData.email,
    userId: req.userData.userId,
  });
  try {
    await createdPost.save();
    console.log("save complete");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not Save post.",
      500
    );
    return next(error);
  }
  res.status(201).json({ post: createdPost });
};

const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data. ", 422)
    );
  }
  const { title, description, content } = req.body;
  const postId = req.params.pid;
  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update post.",
      500
    );
    return next(error);
  }

  //check username is same

  post.title = title;
  post.description = description;
  post.content = content;

  try {
    await post.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update post.",
      500
    );
    return next(error);
  }
  res.status(200).json({ post: post.toObject({ getters: true }) });
};

//delete post
const deletePost = async (req, res, next) => {
  const postId = req.params.pid;
  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete post.",
      500
    );
    return next(error);
  }
  if (!post) {
    const error = new HttpError("Could not find post for this id.", 404);
    return next(error);
  }

  // if (post.userId !== req.userData.userId) {
  //   const error = new HttpError(
  //     "You are not allowed to delete this place.",
  //     401
  //   );
  //   return next(error);
  // }
  try {
    await Post.findByIdAndDelete(postId);
  } catch (err) {
    const error = new HttpError(
      "Can't delete Post,try again later.",
      401
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted post." });
};
//Export all controllers
exports.getPosts = getPosts;
exports.getSinglePost = getSinglePost;
exports.myPosts = myPosts;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
