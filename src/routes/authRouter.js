import express from 'express';
import {
  userRegister,
  userLogin,
  userChangePassword,
  userLogout,
} from '../controllers/authController.js';
import checkAuth from '../middlewares/checkAuth.js';

const authRouter = express.Router();

authRouter.route('/register').post(userRegister);
authRouter.route('/login').post(userLogin);
authRouter.route('/changePassword/:id').post(checkAuth, userChangePassword);
authRouter.route('/logout').post(checkAuth, userLogout);

export default authRouter;
