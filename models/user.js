import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    unique: true,
  },

  creadetAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    console.log(err);
  }
});

export default mongoose.model("User", userSchema);
