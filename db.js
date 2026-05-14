import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected to server");
  } catch (err) {
    console.log("Error accured while connecting MongoDB");
  }
};

export default MongoDB;
