import mongoose from 'mongoose';

const PhraseSchema = mongoose.Schema(
  {
    phrase: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Phrase = mongoose.model('Phrase', PhraseSchema);
export default Phrase;
