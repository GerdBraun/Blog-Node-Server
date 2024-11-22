// controllers/users.js

// TODO: refactor to using bridge table for categories

import {Category} from "../db/index.js";
import {Post} from "../db/index.js";
import {User} from "../db/index.js";

export const getCategories = async (req, res) => {
  try {
    const users = await Category.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const {
      body: { firstName, lastName, email },
    } = req;
    if (!firstName || !lastName || !email)
      return res
        .status(400)
        .json({ error: "firstName, lastName, and email are required" });
    const category = await Category.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const category = await Category.findByPk(id,{
        include: [
            {
                model:Post,
                required: true,
                attributes: [
                    "id","title","updatedAt"
                ],
            }
        ]
    });
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const {
      body: { firstName, lastName, email },
      params: { id },
    } = req;
    if (!firstName || !lastName || !email)
      return res
        .status(400)
        .json({ error: "firstName, lastName, and email are required" });
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    await category.update(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    await category.destroy();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
