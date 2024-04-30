const express = require("express");
const router = express.Router();
const Blog = require("./../models/Blog");
const User = require("./../models/User");

const { jwtAuthMiddleware } = require("./../jwt");

//Post route to add Blogs
router.post("/", async (req, res) => {
  try {
    const { title, description, image, author } = req.body;

    if (!title || !description || !image || !author) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newBlog = new Blog({
      title,
      description,
      image,
      author,
    });

    const response = await newBlog.save();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: "Internal server error",
    });
  }
});

// Get List of all blogs
router.get("/", async (req, res) => {
  try {
    // Find all blogs and in descending order based on date.
    const blogs = await Blog.find().sort({ date: -1 });

    // Return the list of blogs
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// // //Put method to update the Blog Data

router.put("/:blogID", async (req, res) => {
  try {
    const blogID = req.params.blogID;
    const updateBlogData = req.body;

    const response = await Blog.findByIdAndUpdate(blogID, updateBlogData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ Error: "Blog with the id not found!!" });
    }

    console.log(" Blog data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// //Delete the Blog

router.delete("/:blogID", async (req, res) => {
  try {
    const blogID = req.params.blogID;

    const response = await Blog.findByIdAndDelete(blogID);

    if (!response) {
      return res.status(404).json({ Error: "Blog with the id not found!!" });
    }

    console.log("Blog data deleted");
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
