// models/Post.js
import { DataTypes } from "sequelize"; // The library provides an object to help you  define types for your model attributes.
import sequelize from "../db/index.js"; // See we needed this
import User from "./User.js";

// Define the Post model

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
    allowNull: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Post.belongsTo(User, {foreignKey:'authorId'});

Post.sync(); // Check the block about Model synchronization
// Post.sync({force:true}); // Check the block about Model synchronization

export default Post;
