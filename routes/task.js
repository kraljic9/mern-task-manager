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

router.put("/:id", async (req, res) => {
  try {
    const { title, completed } = req.user;

    if (!title || !completed) {
      res.status(400).json({ message: `Error invalid credidentals` });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(400).json(`Error task with id ${id} does not exists`);
    }

    task.title = title || task.title;
    if (task.completed === undefined)
      task.completed ? completed : task.completed;

    const newTask = await task.save();

    res.status(200).json(newTask);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server error`, err });
  }
});

// Delete task

router.delet("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;

    const task = Task.findById(id);

    if (!task) {
      return res.status(400).json(`Error task with id ${id} does not exists`);
    }

    task.deleteOne();

    res.status(200).json(newTask);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server error`, err });
  }
});

export default router;
