import express from 'express';
import {
  userProfile,
  userUpdate,
  userDelete,
} from '../controllers/userController.js';
import checkAuth from '../middlewares/checkAuth.js';

const usersRouter = express.Router();

usersRouter
  .route('/profile/:id')
  .get(checkAuth, userProfile)
  .put(checkAuth, userUpdate)
  .delete(checkAuth, userDelete);

export default usersRouter;
