const jwt = require("jsonwebtoken");

// let secret_key = process.env.secret_key;

let generateToken = (payload) => {
  return jwt.sign(payload, "secret_key");
};

let verifyToken = (token) => {
  return jwt.verify(token, "secret_key");
};

module.exports = { generateToken, verifyToken };