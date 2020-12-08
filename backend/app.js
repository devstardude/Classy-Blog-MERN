require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoute = require("./routes/postsRoute");
const usersRoute = require("./routes/usersRoute");

const app = express();

app.use(bodyParser.json());

// To handle cors error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

//Routes
app.use("/api/posts",postsRoute);
app.use("/api/users",usersRoute); 

//Handle unkonwn route
app.use((req, res, next) => {
  const error = new HttpError("Couldn't Find This Route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

// Database Connection
const onlineDbLink = String(process.env.DB)
const localDbLink = "mongodb://localhost:27017/classyBlogReactDB";
mongoose
  .connect(localDbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server started \nDatabase Connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
