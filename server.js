/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { swaggerUi, swaggerSpec } = require('./utils/swagger');
const { server: expressConfig, logger: loggerConfig } = require('./config')();
const { notFoundHandler, defaultErrorHandler } = require('./utils/errorHandler');

/**
 * Routes
 */
const api = require('./routes/api');
const root = require('./routes/root');

/**
 * Create Express server.
 */
const app = express();

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
app.use('/', root);

// Mount 404 handler as penultimate middleware
app.use(notFoundHandler);

// Mount catch-all error handler
app.use(defaultErrorHandler);

module.exports = app;
