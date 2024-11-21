// controllers/posts.js
import { Post, sequelize } from "../db/index.js";
import { User } from "../db/index.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          required: true,
          attributes: ["id", "firstName", "lastName", "avatar"],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const {
      body: { title, author, content, cover },
    } = req;
    if (!title || !author || !content || !cover)
      return res
        .status(400)
        .json({ error: "title, author, content and cover are required" });
    const post = await Post.create(req.body);
    res.json(post);
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
          attributes: ["id", "firstName", "lastName", "avatar"],
        },
      ],
    });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const {
      body: { title, author, content, cover },
      params: { id },
    } = req;
    if (!title || !author || !content || !cover)
      return res
        .status(400)
        .json({ error: "title, author, content and cover are required" });
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    await post.update(req.body);
    res.json(post);
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
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
