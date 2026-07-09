const express = require("express");
const router = express.Router();
const User = require("C:\\Users\\Paramjeet Redhu\\OneDrive\\Desktop\\my-first-server\\models\\User.js");

// CREATE - Post a new user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(400).json({ message: "Failed to create user", error: error.message });
  }
});

// READ - Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;