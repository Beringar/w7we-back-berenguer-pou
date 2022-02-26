require("dotenv").config();
const debug = require("debug")("beringarNetwork:root");
const chalk = require("chalk");
const connectToMongoDB = require("./db");
const startServer = require("./server/startServer");
const app = require("./server");

const mongoDBconnectionString = process.env.MONGO_DB_ATLAS_STRING;
const port = process.env.PORT || 3000;

(async () => {
  try {
    await connectToMongoDB(mongoDBconnectionString);
    await startServer(app, port);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
  }
})();
