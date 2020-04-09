const mongoose = require('mongoose');
const { db: config } = require('../config')();
const tasks = require('./schemas/tasks.js');
const { logger } = require('../services/logger');

mongoose.set('useFindAndModify', false);

// Connect to the database
// construct the database URI and encode username and password.
const dbURI = `mongodb://${config.host}:${config.port}`;

const dbOptions = {
  user: encodeURIComponent(config.username),
  pass: encodeURIComponent(config.password),
  dbName: config.database,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbURI, dbOptions)
  .catch((err) => {
    logger.error(err.message);
  });

// Throw an error if the connection fails
mongoose.connection.on('error', (err) => {
  // if(err) throw err;
  // throw err;
  logger.error(err.message);
});

// mpromise (mongoose's default promise library) is deprecated,
// Plug-in your own promise library instead.
// Use native promises
mongoose.Promise = global.Promise;

module.exports = {
  mongoose,
  models: {
    tasks,
  },
};
