const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
// const secret = "showstopper";

const signToken = (payload) => {
  return jwt.sign(payload, secret);
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = { signToken, verifyToken };

// const { sign, verify } = require("jsonwebtoken");
// let secret = "showstopper";

// module.exports = {
//   signToken: (payload) => sign(payload, secret),
//   verify: (token) => verify(token, secret),
// };
