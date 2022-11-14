import mongoose from 'mongoose';

const imageSchema = mongoose.Schema(
  {
    imageID: {
      type: String,
      require: true,
    },
    imagePath: {
      type: String,
      require: true,
    },
    alternativeText: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Image = mongoose.model('Image', imageSchema);
export default Image;
