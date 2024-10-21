"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cuisine.belongsTo(models.User, { foreignKey: "authorId" });
      Cuisine.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Cuisine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name harus diisi!",
          },
          notEmpty: {
            msg: "Name harus diisi!",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description harus diisi!",
          },
          notEmpty: {
            msg: "Description harus diisi!",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price harus diisi!",
          },
          notEmpty: {
            msg: "Price harus diisi!",
          },
          min: 0,
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "ImgUrl harus diisi!",
          },
          notEmpty: {
            msg: "imgUrl harus diisi!",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category ID harus diisi!",
          },
          notEmpty: {
            msg: "Category ID harus diisi!",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Author ID harus diisi!",
          },
          notEmpty: {
            msg: "Author ID harus diisi!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Cuisine",
    }
  );
  return Cuisine;
};
