import express from "express";
import cors from "cors";

// Import CRUD operations
import {
  createPost,
  deletePost,
  getPosts,
  getPostById,
  updatePost,
} from "./crudOperations.js";

const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',//(https://your-client-app.com)
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/posts", async (req, res) => {
  //const { limit, offset } = req.query;
  return await getPosts(req, res);
});

app.get("/posts/:id", async (req, res) => {
  return await getPostById(req, res);
});

app.post("/posts", async (req, res) => {
  return await createPost(req, res);
});

app.put("/posts/:id", async (req, res) => {
  return await updatePost(req, res);
});

app.delete("/posts/:id", async (req, res) => {
  return await deletePost(req, res);
});

app.listen(port, () => {
  console.log(`API app listening on http://localhost:${port}`);
});
