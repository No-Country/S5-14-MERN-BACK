import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "../config/db.js";
import cors from "../middlewares/cors.js";
import usersRouter from "../routes/userRouter.js";
import authRouter from "../routes/authRouter.js";
import gameRoutes from "../routes/gamesRouter.js";
import scoreRouter from "../routes/scoreRouter.js";
import chatRouter from "../routes/chatRouter.js";
import friendsRouter from "../routes/friendsRouter.js";
import favoritesRouter from "../routes/favoritesRouter.js";
import notificationRouter from "../routes/notificationsRouter.js";
import imagesRouter from "../routes/imagesRouter.js";

// Node 14 path import
import path from "path";
const __dirname = path.resolve();

const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(cors);
connectDB();

server.use(helmet({ crossOriginResourcePolicy: false }));
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/games", gameRoutes);
server.use("/api/scores", scoreRouter);
server.use("/api/friends", friendsRouter);
server.use("/api/chat", chatRouter);
server.use("/api/favorites", favoritesRouter);
server.use("/api/notifications", notificationRouter);
server.use("api/images", imagesRouter);

// Images Fixed Route
server.use("/images", express.static(path.join(__dirname, "/src/images")));

export default server;
