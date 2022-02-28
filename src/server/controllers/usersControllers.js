require("dotenv").config();
const debug = require("debug")("series:userControllers");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  uploadBytes,
  ref,
  getDownloadURL,
} = require("firebase/storage");
const User = require("../../db/models/User");
const encryptPassword = require("../utils/encryptPassword");

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

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
    const oldFileName = path.join("uploads", req.file.filename);
    const newFileName = path.join("uploads", req.file.originalname);
    fs.rename(oldFileName, newFileName, (error) => {
      if (error) {
        next(error);
      }
    });
    fs.readFile(newFileName, async (error, file) => {
      if (error) {
        next(error);
      } else {
        const storageRef = ref(
          storage,
          `${Date.now()}_${req.file.originalname}`
        );
        await uploadBytes(storageRef, file);
        const firebaseFileURL = await getDownloadURL(storageRef);
        const newUser = await User.create({
          username,
          password: encryptedPassword,
          name,
          image: firebaseFileURL,
        });
        debug(
          chalk.cyanBright(`User created with username: ${newUser.username}`)
        );
        res.status(201);
        res.json({
          message: `User registered with username: ${newUser.username}`,
        });
      }
    });
  } catch (error) {
    fs.unlink(path.join("uploads", req.file.filename), () => {
      error.code = 400;
      next(error);
    });
  }
};

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      const error = new Error(`User ${username} not found!`);
      error.code = 401;
      next(error);
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        const error = new Error(`Invalid credentials!`);
        error.code = 401;
        next(error);
      } else {
        const userData = {
          username,
          name: user.name,
          id: user.id,
          image: user.image,
        };
        const token = jwt.sign(userData, process.env.JWT_SECRET);
        debug(
          chalk.cyanBright(
            `Token ${token} generated for > user ${user.username} id:${user.id}`
          )
        );
        res.json({ token });
      }
    }
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
  getAllUsers,
};
