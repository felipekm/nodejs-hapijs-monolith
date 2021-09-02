const LITERALS = require('../../literals/webapi-literals');
const WebApiRouter = require('./webapi-router');

exports.configure = (settings) => {
  this.webApiRouter = new WebApiRouter(global.config.webapi);
  this.settings = settings;

  return settings;
};

exports.start = () => {
  return new Promise(async(resolve, reject) => {
    try {

      // configures routing and http
      console.log(LITERALS.INITIALIZING_API_ROUTES);
      this.webApiRouter.configure(global.config.router, console.log);

      // load plugins
      console.log(LITERALS.INITIALIZING_PLUGINS);
      await this.webApiRouter.loadPlugins();

      // load routes
      await this.webApiRouter.loadAPI();

      // starts router
      this.webApiRouter.start();
    } catch(err) {
      console.error(LITERALS.ERROR_STARTING_API);
      return reject(err);
    }
  });
};

exports.stop = function(cb) {
  this.webApiRouter.stop(cb);
};

module.exports = exports;
