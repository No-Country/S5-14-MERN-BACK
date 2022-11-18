import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from '../config/db.js';
import usersRouter from '../routes/userRouter.js';
import authRouter from '../routes/authRouter.js';
import gameRoutes from '../routes/gamesRoutes.js';


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
server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);
server.use("/api/games", gameRoutes);

export default server;
