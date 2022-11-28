import express from "express";
import upload from "../middlewares/multer-config.js";

import {
  createNewGame,
  eliminateGame,
  findAllGames,
  findGameById,
  modifyExistingGame
} from "../controllers/gamesController.js";
import checkAuth from "../middlewares/checkAuth.js";

const gamesRouter = express.Router();

gamesRouter.route("/").get(findAllGames).post(checkAuth, upload.single("image"), createNewGame);

gamesRouter
  .route("/:id")
  .get(findGameById)
  .put(checkAuth, upload.single("image"), modifyExistingGame)
  .delete(checkAuth, eliminateGame);

export default gamesRouter;
