import { DataTypes } from "sequelize";
import {Post,Category} from "../db/index.js";

export default (sequelize) => {
  const BridgePostCategory = sequelize.define("BridgePostCategory", {
    PostId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: 'id',
      },
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: 'id',
      },
    },
  });
  return BridgePostCategory;
};
