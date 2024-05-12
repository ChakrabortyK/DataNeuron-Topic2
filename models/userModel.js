import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  data: [Object],
  addCount: { type: Number, default: 0 },
  updateCount: { type: Number, default: 0 },
});

export const User = mongoose.model("User", userSchema);
