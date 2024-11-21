// db/index.js
// Import the Sequelize class from the library
import { Sequelize } from "sequelize";
import UserModel from "../models/User.js"
import PostModel from "../models/Post.js"
// Create a new instance of Sequelize with the connection string
const sequelize = new Sequelize(process.env.PG_URI);

const User = UserModel(sequelize);
const Post = PostModel(sequelize);

Post.belongsTo(User, { foreignKey: "authorId" });
User.hasMany(Post, { foreignKey: "authorId" })

try {
    await sequelize.sync({ force: false });
    console.log("Database is ready");
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
  }
  
// Export the instances so we can use them in other files
export {sequelize, Post, User};

