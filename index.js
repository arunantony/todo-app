/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const os = require('os');

/**
 * Routes
 */
const api = require('./routes/api');

/**
 * Create Express server.
 */
const app = express();

const expressConfig = require('./config')().server;
const loggerConfig = require('./config')().logger;

/**
 * Express configuration.
 */
app.set('host', expressConfig.host);
app.set('port', expressConfig.port);

app.use(logger(loggerConfig.level));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);

// sample get request
app.get('/', (req, res) => {
  res.send("It's working!");
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('App is running at %s:%d in %s mode', os.hostname, app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

// const customCommandModel = require('./database');

module.exports = app;
