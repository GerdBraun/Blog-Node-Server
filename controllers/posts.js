// controllers/posts.js
import {
  sequelize,
  Post,
  User,
  Category,
  BridgePostCategory,
} from "../db/index.js";
import multer from "multer";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          required: true,
          attributes: ["id", "firstName", "lastName", "avatar","isAdmin"],
        },
        {
          model: Category,
          required: false,
          attributes: ["id", "label"],
        },
      ],

      order: [["updatedAt", "DESC"]],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const {
      body: { title, author, content },
    } = req;

    const timestamp = new Date().getTime();
    req.body.cover = `http://localhost:3000/${req.file.filename}?t=${timestamp}`;

    if (!title || !author || !content)
      return res
        .status(400)
        .json({ error: "title, author, content and cover are required" });
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const post = await Post.findOne({
      where: [{ id: id }],
      include: [
        {
          model: User,
          required: true,
          attributes: ["id", "firstName", "lastName", "avatar","isAdmin"],
        },
        {
          model: Category,
          required: false,
          attributes: ["id", "label"],
        },
      ],
    });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const {
      body: { title, author, content },
      params: { id },
    } = req;

    const timestamp = new Date().getTime();
    req.body.cover = `http://localhost:3000/${req.file.filename}?t=${timestamp}`;

    if (!title || !author || !content)
      return res
        .status(400)
        .json({ error: "title, author, content and cover are required" });
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    await post.update(req.body);
    await setCategories(req, res);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    await post.destroy();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setCategories = async (req, res) => {
  try {
    const {
      body: { categories },
      params: { id },
    } = req;

    if (categories) {
      await BridgePostCategory.destroy({ where: { PostId: id } });

      const categoriesToInsert = categories.map((cat) => {
        return { PostId: id, CategoryId: cat };
      });
      await BridgePostCategory.bulkCreate(categoriesToInsert);
    }
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
