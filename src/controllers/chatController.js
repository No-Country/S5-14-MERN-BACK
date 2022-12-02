import Phrase from "../models/Phrase.js";

export const getPhrases = async (req, res) => {
  try {
    const phrases = await Phrase.find().select("phrase").sort({ phrase: "asc" });
    return res.json(phrases);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const createPhrase = async (req, res) => {
  const { phrase } = req.body;
  const { admin } = req;
  if (!admin) {
    const error = new Error("Unathorized User");
    return res.status(403).json({ msg: error.message });
  }
  try {
    const existsPhrase = await Phrase.findOne({ phrase });
    if (existsPhrase) {
      const error = new Error("Phrase already exists");
      return res.status(400).json({ msg: error.message });
    }
    const newPhrase = await new Phrase({ phrase });
    await newPhrase.save();
    return res.json({ phrase });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deletePhrase = async (req, res) => {
  const { phraseId } = req.params;
  const { admin } = req;
  if (!admin) {
    const error = new Error("Unathorized User");
    return res.status(403).json({ msg: error.message });
  }
  try {
    const deletedPhrase = await Phrase.findByIdAndDelete(phraseId);
    if (!deletedPhrase) {
      const error = new Error("Phrase don't exists");
      return res.status(404).json({ msg: error.message });
    }
    return res.json({ phrase: deletedPhrase.phrase });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
