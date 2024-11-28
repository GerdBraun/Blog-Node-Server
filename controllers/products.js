import {
  sequelize,
  User,
  BridgeShopCartProduct,
  ShopProduct,
  ShopCart,
} from "../db/index.js";

export const getProducts = async (req, res) => {
  try {
    const products = await ShopProduct.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
