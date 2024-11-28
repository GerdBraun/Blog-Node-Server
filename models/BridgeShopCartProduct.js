import { DataTypes } from "sequelize"; // The library provides an object to help you  define types for your model attributes.
import { User, ShopProduct, ShopCart } from "../db/index.js";

// Define the  model
export default (sequelize) => {
  const BridgeShopCartProduct = sequelize.define("BridgeShopCartProduct", {
    // Model attributes are defined here
    ShopProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: ShopProduct,
        key: "id",
      },
    },
    ShopCartId: {
      type: DataTypes.INTEGER,
      references: {
        model: ShopCart,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return BridgeShopCartProduct;
};
