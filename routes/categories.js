import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategories,
  updateCategory,
} from "../controllers/categories.js";

const userRouter = express.Router();
userRouter.route("/").get(getCategories).post(createCategory);
userRouter.route("/:id").get(getCategoryById).put(updateCategory).delete(deleteCategory);

export default userRouter;
