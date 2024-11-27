// controllers/users.js
import { where } from "sequelize";
import {
  User,
  Post,
  Category,
  ShopProduct,
  BridgeShopCartProduct,
  sequelize,
} from "../db/index.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Post,
          required: false,
          attributes: ["id", "title", "updatedAt"],
        },
        {
          model: Category,
          required: false,
          attributes: ["id", "label"],
        },
        {
          model: BridgeShopCartProduct,
          required: false,
          attributes: ["amount"],
          include: [
            { model: ShopProduct, attributes: ["id", "name"] },
            { model: User, attributes: ["id", "label"],attributes: ["id", "firstName", "lastName"],},
          ],
        },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      body: { firstName, lastName, email },
    } = req;
    if (!firstName || !lastName || !email)
      return res
        .status(400)
        .json({ error: "firstName, lastName, and email are required" });
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await User.findByPk(id, {
      include: [
        {
          model: Post,
          required: false,
          attributes: ["id", "title", "updatedAt"],
        },
        {
          model: Category,
          required: false,
          attributes: ["id", "label"],
        },
        {
          model: BridgeShopCartProduct,
          required: false,
          attributes: ["amount"],
          include: [{ model: ShopProduct, attributes: ["id", "name"] }],
        },
      ],
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const {
      body: { firstName, lastName, email },
      params: { id },
    } = req;
    if (!firstName || !lastName || !email)
      return res
        .status(400)
        .json({ error: "firstName, lastName, and email are required" });
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.update(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.destroy();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
