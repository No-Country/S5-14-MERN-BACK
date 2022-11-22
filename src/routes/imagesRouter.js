import { Router } from "express";
import {
  imageGet,
  imageAdd,
  imageModify,
  imageGetById,
  imageDelete
} from "../controllers/userController.js";
import upload from "../middlewares/multer-config";

const imagesRouter = Router();

imagesRouter
  .route("/:id")
  .get(imageGetById)
  .post(upload, imageAdd)
  .put(upload, imageModify)
  .delete(imageDelete);

imagesRouter.route("/").get(imageGet);

export default imagesRouter;
