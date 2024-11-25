import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Category = sequelize.define("Category", {
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });
  return Category;
};
