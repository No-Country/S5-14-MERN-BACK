import images from "../models/image.js";

// Images get Filter method

export const imagesGet = async (req, res) => {
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

// Get an image by its Id
export const imageGetById = async (req, res) => {
  const { id } = req.params;
  try {
  } catch (e) {}
};

// Add an image to db
export const imagesAdd = async (req, res) => {
  const { id } = req.params;
  try {
  } catch (e) {}
};

// Modify an image

export const imageModify = async (req, res) => {
  const { id } = req.params;
  try {
  } catch (e) {}
};

// Delete an image

export const imageDelete = async (req, res) => {
  const { id } = req.params;
  try {
  } catch (e) {}
};
