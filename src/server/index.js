import express from "express";
import morgan from "morgan";
// import cors from "cors";
import helmet from "helmet";
import connectDB from "../config/db.js";
import cors from "../middlewares/cors.js";
import usersRouter from "../routes/userRouter.js";
import authRouter from "../routes/authRouter.js";
import gameRoutes from "../routes/gamesRoutes.js";
import imagesRouter from "../routes/imagesRouter.js";
import scoreRouter from "../routes/scoreRouter.js";
// import categoryRouter from "../routes/categoryRouter.js";
import fs from "fs";

// Node 14 path import
import path from "path";
const __dirname = path.resolve();

const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// CORS authorisation
// var corsOptionsDelegate = {
//   origin: function (req, callback) {
//     if (process.env.ORIGINS_ALLOWED.indexOf(req.header("Origin")) !== -1) {
//       callback(null, true); // reflect (enable) the requested origin in the CORS response
//     } else {
//       callback(new Error("CORS PROBLEM - NOT ALLOWED ORIGIN")); // disable CORS for this request
//     }
//   },
//   optionsSuccessStatus: 200,
//   methods: ["GET", "POST", "DELETE", "PUT", "UPDATE", "PATCH"]
// };

// server.use(cors({ origin: corsOptionsDelegate }));

// server.use(cors({ origin: "http://localhost:5173" }));

server.use(cors);
connectDB();

server.use(helmet({ crossOriginResourcePolicy: false }));
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/games", gameRoutes);
server.use("/api/scores", scoreRouter);
// server.use("/api/categories", categoryRouter);
server.use("api/images", imagesRouter);

// Images Fixed Route
server.use("/images", express.static(path.join(__dirname, "images")));

export default server;
