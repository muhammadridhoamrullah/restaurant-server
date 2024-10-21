const { Op } = require("sequelize");
const { comparePassword } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const { Cuisine, User, Category } = require("../models/");

const cloudinary = require("cloudinary").v2;

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class Controller {
  static async getCuisinesPub(req, res, next) {
    try {
      let { filter, search, sort, size, number } = req.query;
      let limit = 10;
      let pageNumber = 1;

      // Validasi page size dan page number
      if (size && !isNaN(size)) {
        limit = parseInt(size);
      }
      if (number && !isNaN(number)) {
        pageNumber = parseInt(number);
      }

      let options = {
        where: {},
        limit,
        offset: limit * (pageNumber - 1),
        include: [{ model: Category }, { model: User }],
      };

      if (filter) {
        options.where.categoryId = filter;
      }

      if (search) {
        options.where.name = { [Op.iLike]: `%${search}%` };
      }

      if (sort) {
        const order = sort[0] === "-" ? "DESC" : "ASC";
        const sortBy = order === "DESC" ? sort.slice(1) : sort;
        options.order = [[sortBy, order]];
      }

      let { count, rows: data } = await Cuisine.findAndCountAll(options);
      res.status(200).json({ data, totalItems: count });
    } catch (error) {
      next(error);
    }
  }

  static async getCuisinesPubById(req, res, next) {
    try {
      let { id } = req.params;
      let dataCuisine = await Cuisine.findByPk(id, {
        include: [{ model: Category }, { model: User }],
      });
      if (!dataCuisine) {
        throw { name: "DATANOTFOUND" };
      }

      res.status(200).json(dataCuisine);
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      let { email, password, phoneNumber, address, username } = req.body;
      let regisUser = await User.create({
        email,
        password,
        phoneNumber,
        address,
        username,
      });

      let tampilUser = await User.findOne({
        attributes: { exclude: "password" },
        where: {
          email,
        },
      });

      //   res.send("jalan bosku");
      res.status(201).json(tampilUser);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        throw { name: "EMAIL_PASSWORD_REQUIRED" };
      }

      let user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "INVALIDUSERANDPASS" };
      }

      const comparePass = comparePassword(password, user.password);
      if (!comparePass) {
        throw { name: "INVALIDUSERANDPASS" };
      }

      const token = signToken({
        id: user.id,
      });

      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async uploadImage(req, res, next) {
    try {
      const encode = req.file.buffer.toString("base64");

      const base64Data = `data:${req.file.mimetype};base64,${encode}`;

      const upload = await cloudinary.uploader.upload(base64Data);

      await Cuisine.update(
        {
          imgUrl: upload.secure_url,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      res.status(200).json({ message: "Upload berhasil!" });
    } catch (error) {
      next(error);
    }
  }

  static async loginByGoogle(req, res, next) {
    try {
      const { google_token } = req.headers;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.CLIENTID,
      });

      // console.log(ticket);
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: String(Math.random() * 1000), // ini bebas
        },
      });
      // console.log(user, ">>>>>", created);

      const access_token = signToken({
        id: user.id,
      });

      const status = created ? 201 : 200;

      res.status(status).json({ access_token });

      // const userid = payload["sub"];
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
