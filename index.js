import express from "express";
import cors from "cors";

// Import CRUD operations
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import categoryRouter from "./routes/categories.js";

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
app.use("/categories", categoryRouter);

app.listen(port, () => {
  console.log(`API app listening on http://localhost:${port}`);
});
