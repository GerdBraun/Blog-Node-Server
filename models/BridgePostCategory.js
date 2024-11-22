import { DataTypes } from "sequelize";

export default (sequelize) => {
  const BridgePostCategory = sequelize.define("BridgePostCategory", {
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });
  return BridgePostCategory;
};
