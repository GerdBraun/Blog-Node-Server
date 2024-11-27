import { User,BridgeShopCartProduct,ShopProduct } from "../db/index.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await BridgeShopCartProduct.findAll({
      group: ["UserId", "ShopProductId"],
    });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
