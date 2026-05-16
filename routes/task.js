import express from "express";
import mongoose from "mongoose";
import Task from "../models/task.js";
import auth from "../middleware/auth.js";

// Setup router

const router = express.Router();

// Get tasks

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Task.find();
    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server error`, err });
  }
});

// Get individual task

// Create task

router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      res.status(400).json({ message: "Error invaild credidentals" });
    }

    const user = await Task.create({
      title,
      user: req.user,
    });

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server error`, err });
  }
});
// Edit task

// Delete task

export default router;
