import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  getPostById,
  updatePost,
} from "../controllers/posts.js";
import { upload } from "../middlewares/upload-file.js";

const postRouter = express.Router();
postRouter
  .route("/")
  .get(getPosts)
  .post(upload.single("cover"), function (req, res) {
    createPost(req, res);
  });
postRouter
  .route("/:id")
  .get(getPostById)
  .put(upload.single("cover"), function (req, res) {
    updatePost(req, res);
  })
  .delete(deletePost);

export default postRouter;
