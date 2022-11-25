import Game from "../models/Game.js";
import validateId from "../helpers/idValidator.js";

export const findAllGames = async (req, res) => {
  try {
    const allGames = await Game.find({});

    if (allGames.length == 0)
      return res.status(404).json({ msg: "There are no games in the database" });

    return res.status(200).json({ games: allGames });
  } catch (error) {
    return res.status(500).json({ msg: "We had an error please try again later" });
  }
};

export const findGameById = async (req, res) => {
  const { id } = req.params;

  if (!validateId(id)) return res.status(400).json({ msg: "The Id is not a valid ID" });
  try {
    const foundGame = await Game.findById(id);

    if (!foundGame) return res.status(404).json({ msg: "Game not found" });

    return res.status(200).json({ game: foundGame });
  } catch (error) {
    return res.status(500).json({ msg: "We had an error please try again later" });
  }
};

export const createNewGame = async (req, res) => {
  const { name, description, devices, imagePath, categories } = req.body;
  const { admin } = req;

  if (!admin) return res.status(401).json({ msg: "Unathorized User" });

  const existingGame = await Game.find({ name });

  if (existingGame.length !== 0)
    return res.status(400).json({ msg: "The game's name already exist in the Database" });

  if (!name || !description || !imagePath)
    return res.status(400).json({ msg: "Missing relevant values" });
  try {
    const newGame = new Game({
      name,
      description,
      devices,
      imagePath,
      categories
    });

    const savedGame = await newGame.save();

    return res.status(200).json({ game: savedGame });
  } catch (error) {
    return res.status(500).json({ msg: "We had an error please try again later" });
  }
};

export const modifyExistingGame = async (req, res) => {
  const { id } = req.params;
  const { name, description, devices, imagePath, categories } = req.body;
  const { admin } = req;

  if (!validateId(id)) return res.status(400).json({ msg: "The Id is not a valid ID" });

  if (!admin) return res.status(401).json({ msg: "Unathorized User" });

  try {
    const existingGame = await Game.findById(id);

    if (!existingGame)
      return res.status(400).json({ msg: "There's no registered game with the ID received" });

    //Update the game's information if exists.

    if (name) existingGame.name = name;
    if (description) existingGame.description = description;
    if (devices) existingGame.devices = devices;
    if (imagePath) existingGame.imagePath = imagePath;
    if (categories) existingGame.categories = categories;

    const updatedGame = await existingGame.save();

    return res.status(200).json({ game: updatedGame });
  } catch (error) {
    return res.status(500).json({ msg: "Sorry, an error occured please try again later" });
  }
};

export const eliminateGame = async (req, res) => {
  const { id } = req.params;
  const { admin } = req;

  if (!id) return res.status(400).status({ msg: "Missing Game Id" });

  if (!validateId(id)) return res.status(400).json({ msg: "The Id is not a valid ID" });

  if (!admin)
    return res
      .status(403)
      .json({ msg: "The user doesn't have the right permissions to delete a game" });

  try {
    const foundGame = await Game.findById(id);

    if (!foundGame)
      return res.status(404).json({ msg: "The game ID is not associated with an existing game" });

    await Game.deleteById(id);

    return res.status(200).json({
      game: foundGame
    });
  } catch (error) {
    return res.status(500).json({ msg: "Sorry, an error occured please try again later" });
  }
};
