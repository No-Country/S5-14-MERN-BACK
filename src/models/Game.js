import mongoose from 'mongoose';

const review = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    stars: {
      type: Number,
    },
  },
  { _id: false }
);

const gameSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    imagePath: {
      type: String,
      require: true,
    },
    devides: {
      type: [String],
    },
    categories: {
      type: [String],
    },
    votes: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [review],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Game = mongoose.model('Game', gameSchema);
export default Game;
