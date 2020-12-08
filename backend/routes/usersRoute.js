const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/usersController");

const router = express.Router();

//-----Sign-up
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email")
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

//-----Sign-in
router.post("/login", usersController.login);

module.exports = router;