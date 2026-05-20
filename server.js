import express from "express";
import mongoose from "mongoose";
import MongoDB from "./db.js";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { errorHandler } from "./middleware/errorHandler.js";

MongoDB();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello server");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
