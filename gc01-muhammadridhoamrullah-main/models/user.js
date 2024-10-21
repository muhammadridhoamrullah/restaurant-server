"use strict";
const { Model } = require("sequelize");
const hashing = require("../helper/helper");
const { hashPassword } = require("../helper/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cuisine, { foreignKey: "authorId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email sudah terdaftar!",
        },
        validate: {
          notEmpty: {
            msg: "Email harus diisi!",
          },
          notNull: {
            msg: "Email harus diisi!",
          },
          isEmail: {
            msg: "Email harus valid!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password harus diisi!",
          },
          notEmpty: {
            msg: "Password harus diisi!",
          },
          len: {
            args: [5],
            msg: "Minimal 5 karakter",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "Staff",
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phone Number harus diisi!",
          },
          notEmpty: {
            msg: "Phone Number harus diisi!",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Address harus diisi!",
          },
          notEmpty: {
            msg: "Address harus diisi!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  // User.beforeCreate(async (user) => {
  //   user.password = hashing(user.password);
  // })
  User.beforeCreate(async (user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
