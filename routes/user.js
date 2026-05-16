import User from "../models/user.js";
import mongoose from "mongoose";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !passwrod) {
      return res.status(400).json({ message: `Error invalid credidentals` });
    }

    const isMatch = await User.findOne({ email });

    if (isMatch) {
      return res.status(400).json({ message: `Error user already exists` });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server error`, err });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: `Error invalid credidentals` });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: `Error invalid email, user not found` });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res
        .status(400)
        .json({ message: `Error invalid password, user not found` });
    }

    res.status(200).json({ message: "User logged in", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server error`, err });
  }
});

export default router;
