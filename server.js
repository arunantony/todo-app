/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { swaggerUi, swaggerSpec } = require('./services/swagger');

/**
 * Routes
 */
const api = require('./routes/api');
const index = require('./routes/index');

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

// Enpoint serving API DOC using Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', api);
app.use('/', index);

module.exports = app;
