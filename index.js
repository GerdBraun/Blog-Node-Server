import express from "express";
import cors from "cors";

// Import CRUD operations
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import categoryRouter from "./routes/categories.js";
import shopRouter from "./routes/shop.js";

import { upload } from "./middlewares/upload-file.js";

const app = express();
const port = 3000;

const corsOptions = {
  origin: "*", //(https://your-client-app.com)
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

// blog
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/categories", categoryRouter);

// shop
app.use("/shop" ,shopRouter);

// special: file upload
app.use(express.static("uploads/posts"));
app.post('/profile/:id', upload.single("file"), function (req, res, next) {
  res.send({ location: `http://localhost:3000/${req.file.filename}` });
})

app.listen(port, () => {
  console.log(`API app listening on http://localhost:${port}`);
});
