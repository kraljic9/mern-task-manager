import User from "../models/user.js";
import mongoose from "mongoose";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { userSchema } from "../validations/pathSchema.js";

const router = express.Router();

// Register user
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, email, password } = userSchema.parse(req.body);

    const isMatch = await User.findOne({ email });

    if (isMatch) {
      const error = new Error(`Error user already exists`);
      error.statusCode = 400;
      throw error;
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ user, token });
  }),
);

// Login user
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = userSchema.parse(req.body);

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error(`Error invalid email, user not found`);
      error.statusCode = 400;
      throw error;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      const error = new Error(`Error invalid password, user not found`);
      error.statusCode = 400;
      throw error;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "User logged in", user, token });
  }),
);

export default router;
