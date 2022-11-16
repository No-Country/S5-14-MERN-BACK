import jwtGenerate from "../helpers/jwtGenerator.js";
import User from "../models/User.js";

export const userProfile = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.userID === id || req.admin) {
      const user = await User.findById(req.userID).select("-password -createdAt -updatedAt");

      if (!user) {
        const error = new Error("User not found");
        return res.status(400).json({ msg: error.message });
      }
      return res.json(user);
    } else {
      const error = new Error("User not authenticated");
      return res.status(400).json({ msg: error.message });
    }
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

export const userUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === req.userID) {
      const updatedUser = await User.findByIdAndUpdate(req.userID, req.body, {
        new: true
      }).select("-password -createdAt -updatedAt");
      return res.json(updatedUser);
    } else {
      const error = new Error("User not authenticated");
      return res.status(400).json({ msg: error.message });
    }
  } catch (e) {
    return res.status(400).json({ msg: error.message });
  }
};

export const userDelete = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === req.userID || req.admin) {
      await User.findByIdAndDelete(req.userID);
      return res.json({ msg: "User deleted" });
    } else {
      const error = new Error("User not authenticated");
      return res.status(400).json({ msg: error.message });
    }
  } catch (e) {
    return res.status(400).json({ msg: error.message });
  }
};
