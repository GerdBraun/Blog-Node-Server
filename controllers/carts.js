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
        { model: User, attributes: ["id", "firstName", "lastName", "avatar"] },
        {
          model: BridgeShopCartProduct,
          attributes: ["ShopProductId", "ShopCartId", "amount"],
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
      where: { id: id },
      attributes: ["id"],
      include: [
        { model: User, attributes: ["id", "firstName", "lastName", "avatar"] },
        {
          model: BridgeShopCartProduct,
          attributes: ["ShopProductId", "ShopCartId", "amount"],
          include: [
            {
              model: ShopProduct,
              attributes: ["id", "name", "description", "price", "image"],
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

export const createCart = async (req, res) => {
  //TODO: solve this

  try {
    const {
      body: { userId, productId, amount },
    } = req;
    console.log(req.body);

    // get or create the user's cart
    const cart = await getCreateCartByUserId(userId);
    console.log("cartId", cart.id);

    // add the prod
    const bscp = await BridgeShopCartProduct.create({
      ShopProductId: productId,
      ShopCartId: cart.id,
      amount: amount,
      id_User_id:userId
    });

    // return the cart
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCreateCartByUserId = async (id) => {
  const [cart, created] = await ShopCart.findOrCreate({
    where: { UserId: id },
    defaults: {
      UserId: id,
    },
  });
  return cart;
};
