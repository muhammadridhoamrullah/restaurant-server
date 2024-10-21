// const { Op } = require("sequelize");
// const { comparePassword } = require("../helper/bcrypt");
// const { signToken } = require("../helper/jwt");
const { Cuisine, User } = require("../models/");

class ControllerCuisine {
  static async addCuisine(req, res, next) {
    try {
      const { name, description, price, imgUrl, categoryId } = req.body;
      const data = await Cuisine.create({
        name,
        description,
        price,
        imgUrl,
        categoryId,
        authorId: req.user.id,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getCuisines(req, res, next) {
    try {
      const cuisines = await Cuisine.findAll({
        include: {
          model: User,
          attributes: { exclude: "password" },
        },
        order: [['createdAt', 'DESC']], // Menambahkan parameter order untuk mengurutkan berdasarkan createdAt dengan urutan terbaru
      });
      res.status(200).json(cuisines);
    } catch (error) {
      next(error);
    }
  }

  static async getCuisineById(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Cuisine.findByPk(id);
      if (!data) {
        throw { name: "DATANOTFOUND" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async editCuisine(req, res, next) {
    try {
      let { id } = req.params;
      const { name, description, price, imgUrl, categoryId, authorId } =
        req.body;

      let findData = await Cuisine.findByPk(id);
      if (!findData) {
        throw { name: "DATANOTFOUND" };
      }

      let data = await Cuisine.update(
        { name, description, price, imgUrl, categoryId, authorId },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCuisine(req, res, next) {
    try {
      let { id } = req.params;
      let dataCuisine = await Cuisine.findByPk(id);
      if (!dataCuisine) {
        throw { name: "DATANOTFOUND" };
      }
      await Cuisine.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: `${dataCuisine.name} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerCuisine;
