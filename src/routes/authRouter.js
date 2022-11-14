import express from 'express';
import { userRegister, userLogin } from '../controllers/authController.js';
import checkAuth from '../middlewares/checkAuth.js';

const authRouter = express.Router();

authRouter.route('/register').post(userRegister);
authRouter.route('/login').post(userLogin);

export default authRouter;
