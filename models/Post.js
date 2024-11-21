// models/Post.js
import { DataTypes } from "sequelize"; // The library provides an object to help you  define types for your model attributes.

// Define the Post model
export default (sequelize) => {
  const Post = sequelize.define("Post", {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Post;
};
