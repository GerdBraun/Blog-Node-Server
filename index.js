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
app.route("/posts")
.get(getPosts)
.post(createPost);
app.route("/posts/:id")
.get(getPostById)
.put(updatePost)
.delete(deletePost);

// users
app.route("/users")
.get(getUsers)
.post(createUser);
app.route("/users/:id")
.get(getUserById)
.put(updateUser)
.delete(deleteUser);


app.listen(port, () => {
  console.log(`API app listening on http://localhost:${port}`);
});
