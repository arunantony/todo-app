/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Node To-Do APP API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js', './database/schemas/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', api);

// sample get request
app.get('/', (req, res) => {
  res.send("It's working!");
});

module.exports = app;
