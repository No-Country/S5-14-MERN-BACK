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
var corsOptionsDelegate = {
  origins: function (req, callback) {
    var corsOptions;
    if (process.env.ORIGINS_ALLOWED.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  },
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
};

server.use(cors({ origin: corsOptionsDelegate }));

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
