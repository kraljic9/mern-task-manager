import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const auth = (req, res, next) => {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(400).json({ message: "Headder not found" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server error`, err });
  }
};

export default auth;
