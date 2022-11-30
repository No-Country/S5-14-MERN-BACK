// import Category from "../models/Category-BORRARsinoseusa.js";

// export const getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find().select("name").sort({ name: "asc" });
//     return res.json(categories);
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// };

// export const createCategory = async (req, res) => {
//   const { category } = req.body;
//   if (!category) {
//     const error = new Error("Category name is required");
//     return res.status(400).json({ msg: error.message });
//   }
//   try {
//     const existsCategory = await Category.findOne({ name: category });
//     if (existsCategory) {
//       const error = new Error("Category already exists");
//       return res.status(400).json({ msg: error.message });
//     }
//     const newCategory = await new Category({ name: category });
//     await newCategory.save();
//     return res.json({ category: newCategory.name });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// };

// export const deleteCategory = async (req, res) => {
//   const { categoryId } = req.params;
//   try {
//     const deletedCategory = await Category.findByIdAndDelete(categoryId);
//     if (!deletedCategory) {
//       const error = new Error("Category don't exists");
//       return res.status(400).json({ msg: error.message });
//     }
//     return res.json({ name: deletedCategory.name });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// };
