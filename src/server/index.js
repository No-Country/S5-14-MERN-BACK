import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import connectDB from "../config/db.js";
import usersRouter from "../routes/userRouter.js";
import authRouter from "../routes/authRouter.js";
import gameRoutes from "../routes/gamesRoutes.js";
import upload from "../middlewares/cloudinary";
import scoreRouter from "../routes/scoreRouter.js";
import categoryRouter from "../routes/categoryRouter.js";
import fs from "fs";

// Node 14 path import
import path from "path";
const __dirname = path.resolve();

const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// CORS authorisation
server.use(
  cors({
    origin: "http://localhost:5173"
  })
);

connectDB();

server.use(helmet());
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/games", gameRoutes);
server.use("/api/scores", scoreRouter);
server.use("/api/categories", categoryRouter);
server.use("api/images", upload.array("image"), imagesRouter);
// Images Fixed Route
server.use("/images", express.static(path.join(__dirname, "images")));

export default server;
