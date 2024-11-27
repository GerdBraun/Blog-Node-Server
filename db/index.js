// db/index.js
// Import the Sequelize class from the library
import { Sequelize } from "sequelize";
import UserModel from "../models/User.js";
import PostModel from "../models/Post.js";
import CategoryModel from "../models/Category.js";
import BridgePostCategoryModel from "../models/BridgePostCategory.js";
import ShopProductModel from "../models/ShopProduct.js";
import ShopCartModel from "../models/ShopCart.js";
import ShopCategoryModel from "../models/ShopCategory.js";
// Create a new instance of Sequelize with the connection string
const sequelize = new Sequelize(process.env.PG_URI);

// posts
const User = UserModel(sequelize);
const Post = PostModel(sequelize);
const Category = CategoryModel(sequelize);
const BridgePostCategory = BridgePostCategoryModel(sequelize);

// shop
const ShopCategory = ShopCategoryModel(sequelize);
const ShopProduct = ShopProductModel(sequelize);
const ShopCart = ShopCartModel(sequelize);

// posts
User.hasMany(Post, { foreignKey: "authorId" });
User.hasMany(Category, { foreignKey: "authorId" });
Post.belongsTo(User, { foreignKey: "authorId" });
Post.hasMany(Category, { foreignKey: "authorId" });
Category.belongsTo(User, { foreignKey: "authorId" });

Post.hasMany(BridgePostCategory, { foreignKey: "PostId" });
Category.hasMany(BridgePostCategory, { foreignKey: "CategoryId" });

Category.belongsToMany(Post, { through: BridgePostCategory });
Post.belongsToMany(Category, { through: BridgePostCategory });

// shop
User.belongsToMany(ShopProduct, { through: ShopCart });
ShopProduct.belongsToMany(User, { through: ShopCart });

ShopCart.belongsTo(User,{foreignKey:"id"})
ShopCart.hasOne(ShopProduct,{foreignKey:"id"})
ShopCart.hasOne(User,{foreignKey:"id"})
User.hasMany(ShopCart,{foreignKey:"UserId"})


try {
  await sequelize.sync({ force: false, logging: false });
  console.log("Database is ready");
} catch (error) {
  console.error("\x1b[31m%s\x1b[0m", error);
}

// Export the instances so we can use them in other files
export {
  sequelize,
  Post,
  User,
  Category,
  BridgePostCategory,
  ShopProduct,
  ShopCategory,
  ShopCart,
};
