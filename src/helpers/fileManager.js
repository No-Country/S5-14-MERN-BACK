import fs from "fs";

// Erase file from temporary directory images
const deleteFilefromFS = (filepath, req) => {
  // const tempFilePath = `${req.protocol}://${req.get("host")}/images/${file.filename}`;
  fs.access(filepath, fs.constants.R_OK, err => {
    if (err) {
      console.error("No Read access");
    } else {
      fs.unlink(filepath, error => {
        console.log("error ", error);
      });
    }
  });
};

export default deleteFilefromFS;
