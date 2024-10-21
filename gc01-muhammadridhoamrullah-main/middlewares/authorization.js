const { Cuisine } = require("../models/index");
const authorization = async (req, res, next) => {
  try {
    let { id } = req.params;
    let dataCu = await Cuisine.findByPk(id);
    if (!dataCu) {
      throw { name: "DATANOTFOUND" };
    }

    if (req.user.id == dataCu.authorId) {
      next();
    } else {
      throw { name: "FORBIDDEN" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
