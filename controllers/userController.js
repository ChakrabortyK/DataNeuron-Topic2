import { User } from "../models/userModel.js";

const addData = async (req, res) => {
  try {
    const { username, newData } = req.body;
    if (!username || !newData) {
      return res
        .status(400)
        .json({ message: "Username and newData are required" });
      //   throw new Error("Username and newData are required");
    }
    const user = await User.findOneAndUpdate(
      { username },
      { $set: { data: newData }, $inc: { addCount: 1 } },
      { new: true, upsert: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
      // throw new Error("User not found");
    }
    res.status(200).json({ message: "Data added successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateData = async (req, res) => {
  try {
    const { username, updatedData } = req.body;
    if (!username || !updatedData) {
      return res
        .status(400)
        .json({ message: "Username and newData are required" });
      //   throw new Error("Username and newData are required");
    }
    const user = await User.findOneAndUpdate(
      { username },
      { $set: { data: updatedData }, $inc: { updateCount: 1 } },
      { new: true }
    );
    res.status(200).json({ message: "Data updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCount = async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(400).json({ message: "Username missing" });
    //   throw new Error("Username and newData are required");
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Username not found" });
      //   throw new Error("Username and newData are required");
    }
    res
      .status(200)
      .json({ addCount: user.addCount, updateCount: user.updateCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getCount, updateData, addData };
