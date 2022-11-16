import { Router } from "express";
import {
  imageGet,
  imageAdd,
  imageModify,
  imageGetById,
  imageDelete
} from "../controllers/userController.js";

const imagesRouter = Router();

imagesRouter
  .route("/:id")
  .get(imageGetById)
  .post(upload, imageAdd)
  .put(upload, checkAuth, imageModify)
  .delete(imageDelete);

imagesRouter.route("/").get(imageGet);

export default imagesRouter;
