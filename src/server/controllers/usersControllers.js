const debug = require("debug")("series:userControllers");
const chalk = require("chalk");
const User = require("../../db/models/User");
const encryptPassword = require("../utils/encryptPassword");

const userRegister = async (req, res, next) => {
  const { username, password, name } = req.body;
  try {
    const encryptedPassword = await encryptPassword(password);
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      const error = new Error(`Username ${username} already exists!`);
      error.code = 400;
      next(error);
      return;
    }
    const newUser = await User.create({
      username,
      password: encryptedPassword,
      name,
    });
    debug(chalk.cyanBright(`User created with username: ${newUser.username}`));
    res.status(201);
    res.json({ message: `User registered with username: ${newUser.username}` });
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

module.exports = {
  userRegister,
};
