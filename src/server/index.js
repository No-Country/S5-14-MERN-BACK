import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "../config/db.js";
import usersRouter from "../routes/userRouter.js";
import authRouter from "../routes/authRouter.js";

const server = express();
server.use(express.json());

// var corsOptionsDelegate = {
//   origins: function (req, callback) {
//     var corsOptions;
//     if (process.env.ORIGINS_ALLOWED.indexOf(req.header("Origin")) !== -1) {
//       corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//     } else {
//       corsOptions = { origin: false }; // disable CORS for this request
//     }
//     callback(null, corsOptions); // callback expects two parameters: error and options
//   },
//   optionsSuccessStatus: 200,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
// };

//server.use(cors({ origin: corsOptionsDelegate }));
server.use(
  cors({ origin: ["http://localhost:5173/", "http://localhost:5173", "http://127.0.0.1:5173"] })
);

connectDB();

server.use(helmet());

// CORS authorisation

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

export default server;
