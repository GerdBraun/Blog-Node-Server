// db/index.js
// Import the Sequelize class from the library
import { Sequelize } from "sequelize";
import UserModel from "../models/User.js";
import PostModel from "../models/Post.js";
import CategoryModel from "../models/Category.js";
import BridgePostCategoryModel from "../models/BridgePostCategory.js";
// Create a new instance of Sequelize with the connection string
const sequelize = new Sequelize(process.env.PG_URI);

const User = UserModel(sequelize);
const Post = PostModel(sequelize);
const Category = CategoryModel(sequelize);
const BridgePostCategory = BridgePostCategoryModel(sequelize);

User.hasMany(Post, { foreignKey: "authorId" });
User.hasMany(Category, { foreignKey: "authorId" });
Post.belongsTo(User, { foreignKey: "authorId" });
Post.hasMany(Category, { foreignKey: "authorId" });
Category.belongsTo(User, { foreignKey: "authorId" });

Post.hasMany(BridgePostCategory, { foreignKey: "PostId" });
Category.hasMany(BridgePostCategory, { foreignKey: "CategoryId" });

Category.belongsToMany(Post,{through: BridgePostCategory})
Post.belongsToMany(Category,{through: BridgePostCategory})

try {
  await sequelize.sync({ force: false });
  console.log("Database is ready");
} catch (error) {
  console.error("\x1b[31m%s\x1b[0m", error);
}

// Export the instances so we can use them in other files
export { sequelize, Post, User, Category, BridgePostCategory };
