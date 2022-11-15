import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from '../config/db.js';

import usersRouter from '../routes/userRouter.js';
import authRouter from '../routes/authRouter.js';
import gameRoutes from '../routes/gamesRouter.js';

const server = express();
server.use(express.json());

connectDB();

server.use(helmet());
server.use(cors());
// server.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);
server.use("/api/games", gameRoutes);

export default server;
