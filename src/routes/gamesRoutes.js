import express from "express";
import { createNewGame, eliminateGame, findAllGames, findGameById, modifyExistingGame } from "../controllers/gamesController.js";
import checkAuth from "../middlewares/checkAuth.js";

const gamesRouter = express.Router();

gamesRouter.route("/")
    .get(findAllGames)
    .post(checkAuth, createNewGame);

gamesRouter.route("/:id").get(findGameById)
    .put(checkAuth, modifyExistingGame)
    .delete(checkAuth, eliminateGame);

export default gamesRouter;