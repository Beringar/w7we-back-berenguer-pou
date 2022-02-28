const jwt = require("jsonwebtoken");
const debug = require("debug")("items:middlewares:auth");
const chalk = require("chalk");

const auth = (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    const error = new Error("Token is missing!");
    error.code = 401;
    next(error);
  }
  try {
    const decodedTokenOK = jwt.verify(authorization, process.env.JWT_SECRET);
    req.userId = decodedTokenOK.id;
    debug(
      chalk.greenBright(`Token for user with ID ${decodedTokenOK.id} is valid`)
    );
    next();
  } catch (error) {
    error.code = 401;
    error.message = "Invalid token!";
    next(error);
  }
};

module.exports = { auth };
