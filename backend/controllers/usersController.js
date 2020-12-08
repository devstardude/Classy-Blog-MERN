const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/httpError");
const User = require("../models/User");

const jwt_token = String(process.env.JWT);

//--------Sign up User
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  //check existing user
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  //user is existing
  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }
  //user is new
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }
  //new user details
  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  //save user
   try {
     await createdUser.save();
   } catch (err) {
     const error = new HttpError(
       "Signing up failed, please try again later.",
       500
     );
     return next(error);
   }
   //creating 1hr valid token
     let token;
     try {
       token = jwt.sign(
         { userId: createdUser.id, email: createdUser.email,name:createdUser.name },
         jwt_token,
         { expiresIn: "1h" }
       );
     } catch (err) {
       const error = new HttpError(
         "Signing up failed, please try again later.",
         500
       );
       return next(error);
     }
      res
        .status(201)
        .json({
          userId: createdUser.id,
          name:createdUser.name,
          email: createdUser.email,
          token: token,
        });
};

//------Login User
const login = async (req, res, next) => {
  const { email, password } = req.body;

  //check if user exist
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  //if user doesn't exist
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
  //user exist and password match
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }
  //user exist but password doesn't match
   if (!isValidPassword) {
     const error = new HttpError(
       "Invalid credentials, could not log you in.",
       401
     );
     return next(error);
   }
   //sending login token
   let token;
   try {
     token = jwt.sign(
       { userId: existingUser.id, email: existingUser.email,name:existingUser.name },
       jwt_token,
       { expiresIn: "1h" }
     );
   } catch (err) {
     const error = new HttpError(
       "Logging in failed, please try again later.",
       500
     );
     return next(error);
   }
   //login response
   res.json({
     userId: existingUser.id,
     name: existingUser.name,
     email: existingUser.email,
     token: token,
   });
}

//export controller
exports.signup = signup;
exports.login = login;