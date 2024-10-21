// const { Op } = require("sequelize");
// const { comparePassword } = require("../helper/bcrypt");
// const { signToken } = require("../helper/jwt");
const { Category } = require("../models/");

class ControllerCategories {
  static async addCategory(req, res, next) {
    try {
      let { name } = req.body;
      let addCat = await Category.create({ name });
      res.status(201).json(addCat);
    } catch (error) {
      next(error);
    }
  }

  static async getCategories(req, res, next) {
    try {
      let data = await Category.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async editCategory(req, res, next) {
    try {
      let { id } = req.params;
      let { name } = req.body;
      let dataCat = await Category.findByPk(id);
      if (!dataCat) {
        throw { name: "DATANOTFOUND" };
      }

      let updateCat = await Category.update(
        { name },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json(updateCat);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      let { id } = req.params;
      let dataCat = await Category.findByPk(id);
      if (!dataCat) {
        throw { name: "DATANOTFOUND" };
      }

      await Category.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: `${dataCat.name} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ControllerCategories;
