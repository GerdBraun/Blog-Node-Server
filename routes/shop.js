import express from "express";

import {
  getCarts,
  getCartById,
  createCart,
  updateCart,
} from "../controllers/carts.js";
import { getProducts } from "../controllers/products.js";

const shopRouter = express.Router();

shopRouter.route("/carts").get(getCarts).post(createCart).put(updateCart);
shopRouter.route("/carts/:id").get(getCartById);
shopRouter.route("/products").get(getProducts);
// shopRouter.route("/").get(getCategories).post(createCategory);
// shopRouter.route("/:id").get(getCategoryById).put(updateCategory).delete(deleteCategory);

export default shopRouter;
