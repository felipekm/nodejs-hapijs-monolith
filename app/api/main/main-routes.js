const rootHandler = require('./controllers/root-controller');
const debugHandler = require('./controllers/debug-controller');

module.exports = [
  {
    path: '/',
    method: 'GET',
    config: rootHandler.config,
    handler: rootHandler.handle
  },

  {
    path: '/debug',
    method: 'GET',
    config: debugHandler.config,
    handler: debugHandler.handle
  }
];
