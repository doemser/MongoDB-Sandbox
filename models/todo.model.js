import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    name: String,
    isDone: Boolean,
  },
  { timestamps: true }
);

export default mongoose.models.Todo || mongoose.model("Todo", todoSchema);
