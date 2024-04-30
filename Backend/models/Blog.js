const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    require: true,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
