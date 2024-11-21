import express from "express";
import cors from "cors";

// Import CRUD operations
import {
  createPost,
  deletePost,
  getPosts,
  getPostById,
  updatePost,
} from "./controllers/posts.js";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "./controllers/users.js";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";

const app = express();
const port = 3000;

const corsOptions = {
  origin: "*", //(https://your-client-app.com)
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`API app listening on http://localhost:${port}`);
});
