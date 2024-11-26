// models/Post.js
import { DataTypes } from "sequelize"; // The library provides an object to help you  define types for your model attributes.
import {ShopCategory} from "../db/index.js";

// Define the Post model
export default (sequelize) => {
  const ShopProduct = sequelize.define("ShopProduct", {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: ShopCategory,
        key: "id",
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  return ShopProduct;
};
