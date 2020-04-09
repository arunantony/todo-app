/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

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

app.use(logger('dev'));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);

// sample get request
app.get('/', (req, res) => {
  res.send("It's working!");
});

module.exports = app;
