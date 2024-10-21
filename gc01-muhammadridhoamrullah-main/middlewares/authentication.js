const { verifyToken } = require("../helper/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    // 1. CEK TERLEBIH DAHULU APAKAH ADA TOKENNYA ATAU TIDAK?
    if (!req.headers.authorization) {
      throw { name: "UNAUTHORIZED" };
    }

    // 2. SPLIT HEADERS AUTHORIZATION KARENA MENGGUNAKAN BEARER TOKEN
    const token = req.headers.authorization.split(" ")[1];
    //menghasilkan token yang sudah di split,contoh : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQsImlhdCI6MTcxNjg4NTc1OH0.qO74D30el4M7Qc1jG0tcaDEOF1DJiPvmYIYw3Wk9g5U

    // 3. VERIFY TOKENNYA
    const payload = verifyToken(token);
    // menghasilkan { id: 74, iat: 1716885758 }

    // 4. Check user berdasarkan data dari payload
    const user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "UNAUTHORIZED" };
    }

    // ini dibawa
    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
