const debug = require("debug")("beringarNetwork:database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectToMongoDB = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-param-reassign, no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-param-reassign, no-underscore-dangle
        delete ret.__v;
      },
    });
    mongoose.connect(connectionString, (error) => {
      if (error) {
        reject(error);
        return;
      }
      debug(chalk.greenBright(`Beringar Network Database connected`));
      resolve();
    });
  });
module.exports = connectToMongoDB;
