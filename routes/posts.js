import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  getPostById,
  updatePost,
} from "../controllers/posts.js";

const postRouter = express.Router();
postRouter.route("/").get(getPosts).post(createPost);
postRouter.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

export default postRouter;
