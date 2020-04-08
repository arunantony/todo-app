const mongoose = require('mongoose');
const config = require('../config')().db;
const tasks = require('./schemas/tasks.js');

mongoose.set('useFindAndModify', false);

// Connect to the database
// construct the database URI and encode username and password.
// const dbURI = `mongodb://${config.host}:${config.port}`;
const dbURI = 'mongodb://localhost:$27017';

// const dbOptions = {
//   user: encodeURIComponent(config.username),
//   pass: encodeURIComponent(config.password),
//   dbName: config.database,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

const dbOptions = {
  user: encodeURIComponent(''),
  pass: encodeURIComponent(''),
  dbName: 'todo_db',
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbURI, dbOptions)
  .catch((err) => {
    console.log(err.message);
  });

// Throw an error if the connection fails
mongoose.connection.on('error', (err) => {
  // if(err) throw err;
  // throw err;
  console.log(err.message);
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
