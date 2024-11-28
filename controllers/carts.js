import {
  sequelize,
  User,
  BridgeShopCartProduct,
  ShopProduct,
  ShopCart,
} from "../db/index.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await ShopCart.findAll({
      attributes: ["id"],
      include: [
        { model: User, attributes: ["id", "firstName", "lastName","avatar"] },
        {
          model: BridgeShopCartProduct,
          attributes: ["ShopProductId","ShopCartId","amount"],
          include: [
            {
              model: ShopProduct,
              attributes: ["id", "name", "description", "price"],
            },
            {
              model: User,
              attributes: ["id", "firstName", "lastName"],
            },
          ],
        },
      ],
    });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartById = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const carts = await ShopCart.findOne({
      where:{id:id},
      attributes: ["id"],
      include: [
        { model: User, attributes: ["id", "firstName", "lastName","avatar"] },
        {
          model: BridgeShopCartProduct,
          attributes: ["ShopProductId","ShopCartId","amount"],
          include: [
            {
              model: ShopProduct,
              attributes: ["id", "name", "description", "price","image"],
            },
          ],
        },
      ],
    });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
