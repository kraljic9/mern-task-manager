import User from "../models/user.js";
import mongoose from "mongoose";
import express from "express";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, passwrod } = req.body;

    if (!username && !email && !passwrod) {
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

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server error`, err });
  }
});

export default router;
