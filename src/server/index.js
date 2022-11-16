import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "../config/db.js";

// MJV added for services image
import { v2 as cloudinary } from "cloudinary";
import morgan from "morgan";
import upload from "../middleware/multer-config";

import usersRouter from "../routes/userRouter.js";
import authRouter from "../routes/authRouter.js";

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false })); // image services

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  cloud_api: process.env.CLOUD_KEY,
  cloud_secret: process.env.CLOUD_SECRET
});

connectDB();

server.use(helmet());
server.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 204
  })
);

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

// Images Fixed Route
app.use("/images", express.static(path.join(__dirname, "images")));

export default server;
