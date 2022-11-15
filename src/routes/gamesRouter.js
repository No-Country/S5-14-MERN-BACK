import express from "express";
import { findAllGames, findGameById } from "../controllers/gamesController.js";
import checkAuth from "../middlewares/checkAuth.js";

const gamesRouter = express.Router();

gamesRouter.route("/")
    .get(findAllGames)
    // .post(checkAuth,);

gamesRouter.route("/:id").get(findGameById);


export default gamesRouter;