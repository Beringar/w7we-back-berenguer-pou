require("dotenv").config();
const debug = require("debug")("beringarNetwork:root");
const chalk = require("chalk");
const connectToMongoDB = require("./db");

const mongoDBconnectionString = process.env.MONGO_DB_ATLAS_STRING;

(async () => {
  try {
    await connectToMongoDB(mongoDBconnectionString);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
  }
})();
