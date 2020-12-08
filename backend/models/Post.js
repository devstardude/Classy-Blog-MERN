const mongoose = require("mongoose");
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: {
    type: String,
    required: true,
  },
  username: String,
  email: String,
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  time: String,
  userId:String,
  sanitizedContent: {
    type: String,
    required: true,
  },
});

//Sanitization and conversion of markdown into html
PostSchema.pre("validate", function (next) {
  if (this.content) {
    this.sanitizedContent = dompurify.sanitize(marked(this.content));
  }
  next();
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
