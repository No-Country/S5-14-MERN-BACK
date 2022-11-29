import express from "express";
import { getPhrases, createPhrase, deletePhrase } from "../controllers/chatController.js";
import checkAuth from "../middlewares/checkAuth.js";

const chatRouter = express.Router();

chatRouter.route("/phrases").get(checkAuth, getPhrases).post(checkAuth, createPhrase);
chatRouter.route("/phrases/:phraseId").delete(checkAuth, deletePhrase);

export default chatRouter;
