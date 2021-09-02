const Hapi = require('hapi');
const LITERALS = require('../../literals/webapi-literals');
const webApiHelper = require('../../helpers/webapi-helper');

class WebApiWorker {

  constructor(settings) {
    this.settings = settings;
    this.httpServer = Hapi.Server({
      host: this.settings.connection.host,
      port: parseInt(this.settings.connection.port, 10),
      app: this.settings.server
    });
  }

  configure() {
    try {

      // setting api store to expose in debug routes
      global.apis = {};
      global.routes = [];
      global.plugins = [];

      // Creating app
      console.log(LITERALS.INITIALIZING_HTTP_SERVER);

    } catch(err) {
      console.error(LITERALS.ERROR_CONFIGURING_API);
      throw err;
    }
  }

  registerPlugin(plugin, path) {
    return new Promise(async(resolve, reject) => {
      try {

        await this.httpServer.register({
          plugin: plugin,
          options: plugin.options
        });

        global.plugins.push(path);

        return resolve();
      } catch(err) {
        return reject(err);
      }
    });
  }

  async loadAPI() {
    return new Promise(async(resolve, reject) => {
      try {
        const apiPaths = global.config.webapi.paths;
        let i;

        for (i = 0; i < apiPaths.length; i++) {
          const path = apiPaths[i];
          const fullPath = `${global.config.root}app/api/${path}`;
          const routes = await webApiHelper.requireModules(fullPath, this.settings.sufix);

          console.log(LITERALS.INITIALIZING_API(path));
          console.log(LITERALS.API_FOLDER_PATH(fullPath));

          // registering api - saving information for debugging
          global.apis[path] = true;

          try {
            routes.forEach(async(module) => {
              try {
                await this.registerRoute(module.loadedModule, module.filePath);
              } catch(err) {
                console.log(LITERALS.ERROR_REGISTERING_PLUGIN(fullPath));
                return reject(err);
              }
            });
          }
          catch(err) {
            global.apis[path] = false;
            console.error(LITERALS.ERROR_LOADING_API(path));
            return reject(err);
          }
        }

        console.log(LITERALS.API_HAS_BEEN_REGISTERED);

        return resolve();
      } catch(err) {
        return reject(err);
      }
    });
  }

  async loadPlugins() {
    return new Promise(async(resolve, reject) => {
      try {
        const fullPath = `${global.config.root}${this.settings.plugins.folder}`;

        console.log(LITERALS.PLUGINS_FOLDER_PATH(fullPath));

        if (!this.httpServer) {
          console.error(LITERALS.ERROR_SERVER_UNDEFINED);
          throw new Error(LITERALS.ERROR_SERVER_UNDEFINED);
        }

        const plugins = await webApiHelper.requireModules(fullPath, this.settings.plugins.sufix);

        if (plugins.length === 0) {
          console.log(LITERALS.NO_PLUGINS_FOUND);
          return resolve();
        }

        for (let pluginsIndex = 0; pluginsIndex < plugins.length; pluginsIndex++) {
          const module = plugins[pluginsIndex];

          try {
            await this.registerPlugin(module.loadedModule, module.filePath);

          } catch(err) {
            console.log(LITERALS.ERROR_REGISTERING_PLUGIN(fullPath));
            return reject(err);
          }
        }

        console.log(LITERALS.PLUGINS_HAS_BEEN_REGISTERED);
        return resolve();

      } catch(err) {
        console.error(LITERALS.ERROR_LOADING_PLUGINS);
        return reject(err);
      }
    });
  }

  async registerRoute(routeObj, routePath) {
    try {
      // handling function scenario
      if (typeof routeObj === 'function') {
        return routeObj(this.httpServer);
      }
      // regis5tering route
      await this.httpServer.route(routeObj);

      // saving route path
      global.routes.push(routePath);
    } catch(err) {
      console.error(LITERALS.ERROR_REGISTERING_ROUTE(routePath), err);
      throw err;
    }
  }

  async start() {
    try {
      console.log(LITERALS.STARTING_HTTP_SERVER);

      await this.httpServer.start();

      console.log(LITERALS.CURRENTLY_NODE_ENV(process.env.NODE_ENV));
      console.log(LITERALS.CURRENTLY_SERVER_URL(this.httpServer.info.uri));

    } catch (e) {
      console.error(LITERALS.ERROR_STARTING_SERVER);
      throw e;
    }
  }

  async stop() {
    try {
      console.log(LITERALS.SHUTTING_DOWN);
      await this.httpServer.stop();
    } catch (err) {
      console.error(LITERALS.ERROR_UNEXPECTED);
      console.error(LITERALS.ERROR_DETAILS(err));
    }
  }

}

module.exports = WebApiWorker;
