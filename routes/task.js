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

router.get("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(400).json(`Error task with id ${id} does not exists`);
    }

    res.status(200).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server error`, err });
  }
});

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
