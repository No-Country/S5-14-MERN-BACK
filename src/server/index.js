import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "../config/db.js";
import usersRouter from "../routes/userRouter.js";
import authRouter from "../routes/authRouter.js";

const server = express();
server.use(express.json());

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (process.env.ORIGINS_ALLOWED.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

server.use(cors(corsOptionsDelegate));

connectDB();

server.use(helmet());

// CORS authorisation

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

export default server;
