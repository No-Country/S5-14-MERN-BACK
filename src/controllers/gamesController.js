import Game from "../models/Game.js";

export const findAllGames = async (req, res) => {
    const allGames = await Game.find({});
    if (allGames.length == 0) return res.status(404).json({ msg: "There are no games in the database" })

    return res.status(200).json({ games: allGames[0] });
}

export const findGameById = async (req, res) => {
    const { id } = req.params;

    console.log(id);

    const foundGame = Game.findById(id);

    if (!foundGame) return res.status(404).json({ msg: "Game not found" });

    return res.status(200).json({ game: foundGame });
}

export const createNewGame = async (req, res) => {

    const { name, description, devices, imagePath, categories } = req.body;
    const { admin } = req;

    if (!admin) return res.status(401).json({ msg: "Unathorized User" });

    const existingGame = await Game.find({ name });

    console.log(existingGame);

    if (existingGame.length !== 0) return res.status(400).json({ msg: "The game's name already exist in the Database" });

    if (!name || !description || !imagePath) return res.status(400).json({ msg: "Missing relevant values" });
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

}

export const modifyExistingGame = async (req, res) => {
    const { id } = req.params;
    const { name, description, devices, imagePath, categories } = req.body;
    const { admin } = req;

    if (!admin) return res.status(401).json({ msg: "Unathorized User" });

    const existingGame = await Game.findById(id);

    if (!existingGame) return res.status(400).json({ msg: "There's no registered game with the ID received" });

    try {
        //Update the game's information if exists.

        if (name) existingGame.name = name;
        if (description) existingGame.description = description;
        if (devices) existingGame.devices = devices;
        if (imagePath) existingGame.imagePath = imagePath;
        if (categories) existingGame.categories = categories;

        const updatedGame = await existingGame.save();

        return res.status(200).json({ game: updatedGame });

    } catch (error) {
        return res.status(500).json({ msg: "We had an error please try again later" });
    }

}