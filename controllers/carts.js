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
      attributes: ["id","updatedAt"],
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
      attributes: ["id","updatedAt"],
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
  try {
    const {
      body: { userId, productId, amount },
    } = req;

    // get or create the user's cart
    const cart = await getCreateCartByUserId(userId);

    const prodToSave = {
      ShopProductId: productId,
      ShopCartId: cart.id,
      amount: amount,
      id: userId,
    };

    // find existing bscp
    const existingBSCP = await BridgeShopCartProduct.findOne({
      where: {
        ShopProductId: productId,
        ShopCartId: cart.id,
      },
    });

    if (existingBSCP) {
      // add amount
      const bscp = await BridgeShopCartProduct.update(
        {
          amount: amount + existingBSCP.amount,
        },
        {
          where: {
            ShopProductId: productId,
            ShopCartId: cart.id,
          },
        }
      );
    } else {
      // add the prod
      const bscp = await BridgeShopCartProduct.create(prodToSave);
    }

    // return the cart
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const {
      body: { cartId, productId, amount },
    } = req;

    if (amount === 0) {
      await BridgeShopCartProduct.destroy({
        where: {
          ShopCartId: cartId,
          ShopProductId: productId,
        },
      });
    } else {
      await BridgeShopCartProduct.update(
        {
          amount: amount
        },
        {
          where: {
            ShopCartId: cartId,
            ShopProductId: productId,
          },
        }
      );
    }
    const carts = await ShopCart.findOne({
      where: { id: cartId },
    });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Utility functions
 */

const getCreateCartByUserId = async (id) => {
  const [cart, created] = await ShopCart.findOrCreate({
    where: { UserId: id },
    defaults: {
      UserId: id,
    },
  });
  return cart;
};
