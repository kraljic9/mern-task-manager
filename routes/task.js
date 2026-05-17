import express from "express";
import mongoose from "mongoose";
import Task from "../models/task.js";
import auth from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Setup router

const router = express.Router();

// Get tasks

router.get(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const posts = await Task.find();
    res.status(200).json({ posts });
  }),
);

// Get individual task

router.get(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const task = await Task.findById(id);

    if (!task) {
      const error = new Error(`Error task with id ${id} does not exists`);
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json(task);
  }),
);

// Create task

router.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title) {
      const error = new Error("Error invalid credidentals");
      error.statusCode = 400;
      throw error;
    }

    const user = await Task.create({
      title,
      user: req.user,
    });

    res.status(201).json(user);
  }),
);
// Edit task

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { title, completed } = req.user;

    if (!title || !completed) {
      const error = new Error(`Error task with id ${id} does not exists`);
      error.statusCode = 400;
      throw error;
    }

    const task = await Task.findById(id);

    if (!task) {
      const error = new Error("Access denied, this is not your task");
      error.statusCode = 403;
      throw error;
    }

    if (task.user.toString() !== req.user) {
      const error = new Error("Access denied, this is not your task");
      error.statusCode = 403;
      throw error;
    }

    task.title = title || task.title;
    if (task.completed !== undefined) task.completed = completed;

    const newTask = await task.save();

    res.status(200).json(newTask);
  }),
);

// Delete task

router.delet(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const task = Task.findById(id);

    if (!task) {
      const error = new Error(`Error task with id ${id} does not exists`);
      error.statusCode = 400;
      throw error;
    }

    if (task.user.toString() !== req.user) {
      const error = new Error("Access denied, this is not your task");
      error.statusCode = 403;
      throw error;
    }

    await task.deleteOne();

    res.status(200).json(newTask);
  }),
);

export default router;
