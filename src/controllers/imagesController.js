import Image from "../models/Image";
import { v2 as cloudinary } from "cloudinary";

export const imageGet = async (req, res) => {
  console.log(req);
  res.status(200).json({ message: "Images Get" });
};

export const imageGetById = async (req, res) => {
  const { id } = req.params;
  console.log(req);
  res.status(200).json({ message: "Images GetById" });
};

export const imageAdd = async (req, res) => {
  if (req.files.image.ws.bytesWritten === 0) {
    res.status(400).json({ message: "Not uploaded Files" });
  }

  //One Image
  //Get temporary file
  const imagefile = req.files.image.path;
  // upload
  const result = await cloudinary.uploader.upload(imageFile, { tags: "ludens" });
  // result guardar base de datos

  // multiple images
  try {
    const uploader = async path => await cloudinary.uploads(path, "Images" /*folder*/);
    const ulrs = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      ulrs.push(newPath);
      fs.unlinkSync(path);
    }
    res.status(200).json({ message: "Images uploaded successfully", data: urls });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading images" });
  }
};

export const imageModify = async (req, res) => {
  const { id } = req.params;
  console.log(req);
  res.status(200).json({ message: "Images Modify" });
};

export const imageDelete = async (req, res) => {
  const { id } = req.params;
  /*cloudinary.v2.uploader.destroy(public_id, options).then(callback);*/
  console.log(req);
  res.status(200).json({ message: "Images Delete" });
};

// /// Eager Transformations:
// // Applied as soon as the file is uploaded, instead of lazily applying them when accessed by your site's visitors.
// var eager_options = {
//   width: 200, height: 150, crop: 'scale', format: 'jpg'
// };
// cloudinary.uploader.upload("lake.jpg", { tags: "basic_sample", public_id: "blue_lake", eager: eager_options }, function (err, image) {
//   // "eager" parameter accepts a hash (or just a single item). You can pass
//   // named transformations or transformation parameters as we do here.
//   console.log();
//   console.log("** Eager Transformations");
//   if (err) { console.warn(err); }
//   console.log("* " + image.public_id);
//   console.log("* " + image.eager[0].url);
//   waitForAllUploads("lake", err, image);
// });
