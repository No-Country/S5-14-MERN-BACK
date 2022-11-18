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
    devices: {
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

gameSchema.statics.deleteById = function(id) {
  return this.deleteOne({ _id: id })
}

const Game = mongoose.model('Game', gameSchema);

export default Game;
