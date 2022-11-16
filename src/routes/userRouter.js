import express from 'express';
import {
  userProfile,
  userUpdate,
  userDelete,
  addFriend,
  addFavorite,
} from '../controllers/userController.js';
import checkAuth from '../middlewares/checkAuth.js';

const usersRouter = express.Router();

usersRouter
  .route('/profile/:id')
  .get(checkAuth, userProfile)
  .put(checkAuth, userUpdate)
  .delete(checkAuth, userDelete);

usersRouter.post('/addFriend/:id', addFriend);
usersRouter.post('/addFavorite/:id', addFavorite);

export default usersRouter;
