import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "../config/db.js";
import usersRouter from "../routes/userRouter.js";
import authRouter from "../routes/authRouter.js";
import gameRoutes from "../routes/gamesRouter.js";
import scoreRouter from "../routes/scoreRouter.js";
import chatRouter from "../routes/chatRouter.js";
import friendsRouter from "../routes/friendsRouter.js";
import favoritesRouter from "../routes/favoritesRouter.js";
import notificationRouter from "../routes/notificationsRouter.js";

const server = express();
server.use(express.json());

server.use(
  cors({
    origin: "http://localhost:5173"
  })
);

connectDB();

// CORS authorisation

server.use(helmet());
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/games", gameRoutes);
server.use("/api/scores", scoreRouter);
server.use("/api/friends", friendsRouter);
server.use("/api/chat", chatRouter);
server.use("/api/favorites", favoritesRouter);
server.use("/api/notifications", notificationRouter);

export default server;
