// models/Post.js
import { DataTypes } from "sequelize"; // The library provides an object to help you  define types for your model attributes.

// Define the Post model
export default (sequelize) => {
  const ShopCategory = sequelize.define("ShopCategory", {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return ShopCategory;
};
