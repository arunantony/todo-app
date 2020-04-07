const config = require('./config.json');

// static data to don't have to generate the configData 2 times
let configData = null;

module.exports = () => {
  // if the static data was already set. return it
  if (configData !== null && configData !== undefined) {
    return configData;
  }

  configData = {};

  // LOAD JSON
  if (process.env.NODE_ENV === undefined || process.env.NODE_ENV == null || process.env.NODE_ENV === 'development') {
    configData = config.development;

    // LOAD FROM ENV VARIABLES
    configData.server.host = configData.server.ip;
    configData.server.port = process.env.PORT || configData.server.port;
  } else if (process.env.NODE_ENV === 'production') {
    configData = config.production;

    // LOAD FROM ENV VARIABLES
    configData.server.host = configData.server.ip;
    configData.server.port = process.env.PORT || configData.server.port;
  } else if (process.env.NODE_ENV === 'staging') {
    configData = config.staging;

    // LOAD FROM ENV VARIABLES
    configData.server.host = configData.server.ip;
    configData.server.port = process.env.PORT || configData.server.port;
  }
  return configData;
};
