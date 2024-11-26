// models/Post.js
import { DataTypes } from "sequelize"; // The library provides an object to help you  define types for your model attributes.
import { User,ShopProduct } from "../db/index.js";

// Define the Post model
export default (sequelize) => {
  const ShopCart = sequelize.define("ShopCart", {
    // Model attributes are defined here
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: ShopProduct,
        key: "id",
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return ShopCart;
};
