import { DataTypes } from "sequelize"; // The library provides an object to help you  define types for your model attributes.
import { User } from "../db/index.js";

// Define the  model
export default (sequelize) => {
  const ShopCart = sequelize.define("ShopCart", {
    // Model attributes are defined here
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  });
  return ShopCart;
};
