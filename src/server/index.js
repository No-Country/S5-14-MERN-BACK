import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "../config/db.js";

import usersRouter from "../routes/userRouter.js";
import authRouter from "../routes/authRouter.js";

const server = express();
server.use(express.json());

connectDB();

server.use(helmet());

// CORS authorisation
app.use(cors);

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

// Images Fixed Route
app.use("/images", express.static(path.join(__dirname, "images")));

export default server;
