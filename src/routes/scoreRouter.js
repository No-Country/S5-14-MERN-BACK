import express from "express";
import { setGameScore, getGameScore } from "../controllers/scoreController.js";
import checkAuth from "../middlewares/checkAuth.js";

const scoreRouter = express.Router();

scoreRouter.route("/:gameId").get(getGameScore);
scoreRouter.route("/:gameId").post(checkAuth, setGameScore);

export default scoreRouter;
