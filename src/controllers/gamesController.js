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

// export const createNewGame = async (req, res) => {
//     const { name, description, devices, imagePath, categories } = req.body;
//     const { admin } = req;

//     if (!admin) return res.status(401).json({ msg: "Unathorized User" });

//     if (!name || !description || !imagePath) return res.status(400).json({ msg: "Missing relevant values" });

//     const newGame = new Game({
//         name,
//         description,
//         devices,
//         imagePath,
//         categories
//     })

// }