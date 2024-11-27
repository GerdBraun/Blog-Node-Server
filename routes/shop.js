import express from "express";
// import {
//   createCategory,
//   deleteCategory,
//   getCategoryById,
//   getCategories,
//   updateCategory,
// } from "../controllers/shop.js";

import { getCarts } from "../controllers/carts.js";

const shopRouter = express.Router();
shopRouter.route("/carts").get(getCarts);
// shopRouter.route("/").get(getCategories).post(createCategory);
// shopRouter.route("/:id").get(getCategoryById).put(updateCategory).delete(deleteCategory);

export default shopRouter;
