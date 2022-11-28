import mongoose from "mongoose";

const review = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    stars: {
      type: Number
    }
  },
  { _id: false }
);

const gameSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      require: true,
      trim: true
    },
    cover: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image"
    },
    devices: {
      type: [String]
    },
    audiencies: {
      type: String
    },
    coming_soon: {
      type: Boolean,
      default: true
    },
    reviews: {
      type: [review]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

gameSchema.statics.deleteById = function (id) {
  return this.deleteOne({ _id: id });
};

const Game = mongoose.model("Game", gameSchema);

export default Game;
