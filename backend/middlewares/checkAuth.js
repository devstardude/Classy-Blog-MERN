const jwt = require("jsonwebtoken");

const HttpError = require("../models/httpError");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const jwt_token = String(process.env.JWT);
    const decodedToken = jwt.verify(token, jwt_token);
    req.userData = {
      userId: decodedToken.userId,
      email: decodedToken.email,
      name: decodedToken.name,
    };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  }
};
