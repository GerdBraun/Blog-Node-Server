import express from "express";
import cors from "cors";

// Import CRUD operations
import {
  createPost,
  deletePost,
  getPosts,
  getPostById,
  updatePost,
} from "./controllers/Post.js";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "./controllers/User.js";

const app = express();
const port = 3000;

const corsOptions = {
  origin: "*", //(https://your-client-app.com)
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

// posts
app.get("/posts", getPosts);
app.post("/posts", createPost);
app.get("/posts/:id", getPostById);
app.put("/posts/:id", updatePost);
app.delete("/posts/:id", deletePost);

// users
app.get("/users", getUsers);
app.post("/users", createUser);
app.get("/users/:id", getUserById);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

app.listen(port, () => {
  console.log(`API app listening on http://localhost:${port}`);
});
