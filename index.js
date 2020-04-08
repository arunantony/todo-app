const os = require('os');
const app = require('./server');

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('App is running at %s:%d in %s mode', os.hostname, app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
