const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middlewares/checkAuth");
const postsController = require("../controllers/postsController.js");

//Import check auth

const router = express.Router();

//--------BlogPosts Routes

//Get Routes
router.get("/",postsController.getPosts);

router.get("/post/:pId",postsController.getSinglePost);
router.delete("/delete/:pid", postsController.deletePost);

router.use(checkAuth);

router.get("/myposts/:uId",postsController.myPosts);

//Post Routes
router.post("/new", [
  check("title").not().isEmpty(),
  check("description").not().isEmpty(),
  check("content").isLength({ min: 6 }),
],postsController.createPost);

//Patch Route
router.patch(
  "/myposts/edit/:pid",
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("content").isLength({ min: 6 }),
  ],
  postsController.updatePost
);
//Export
module.exports = router;