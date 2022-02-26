const debug = require("debug")("beringarNetwork:server");
const chalk = require("chalk");

const startServer = (app, port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Server listening on port ${port}`));
      resolve();
    });

    server.on("error", (error) => {
      reject(error);
    });
  });

module.exports = startServer;
