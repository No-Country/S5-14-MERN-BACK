import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
  {
    id: {
      type: String,
      require: true
    },
    path: {
      type: String,
      require: true
    },
    alternativeText: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Image = mongoose.model("Image", imageSchema);
export default Image;
