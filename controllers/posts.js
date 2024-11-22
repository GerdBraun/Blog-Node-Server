// controllers/posts.js
import {
  sequelize,
  Post,
  User,
  Category,
  BridgePostCategory,
} from "../db/index.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          required: true,
          attributes: ["id", "firstName", "lastName", "avatar"],
        },
        {
          model: Category,
          required: false,
          attributes: ["id","label"],
        },
        // {
        //   model: BridgePostCategory,
        //   required: false,
        //   attributes: ["id", "CategoryId"],
        // },
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
      body: { title, author, content, cover },
    } = req;
    if (!title || !author || !content || !cover)
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
          attributes: ["id", "firstName", "lastName", "avatar"],
        },
        {
          model: BridgePostCategory,
          required: false,
          attributes: ["CategoryId"],
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
