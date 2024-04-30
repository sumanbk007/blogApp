const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");

const { jwtAuthMiddleware, generateToken } = require("./../jwt");

//Post route for sign up
router.post("/signup", async (req, res) => {
  // Extract data from req body
  try {
    const signupData = req.body;

    //Check if the user already exits with same Email address
    const existingUser = await User.findOne({
      email: signupData.email,
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User already exits with given email address" });
    }

    //create new user database collection using database model
    const newUser = new User(signupData);
    const response = await newUser.save();
    res
      .status(200)
      .json({ response: response, message: "Registered Sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Post method to login user

router.post("/login", async (req, res) => {
  try {
    //Extract data form req body
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: " Email and password is required" });
    }

    const user = await User.findOne({
      email: email,
    });
    console.log(user);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email and password" });
    }

    // generate Token
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);

    // return token as response
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

module.exports = router;
