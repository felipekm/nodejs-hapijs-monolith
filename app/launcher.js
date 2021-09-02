// App dependencies
const Kernel = require('./core/kernel');
const DBFactory = require('./core/dao/dbfactory');
const ConfigFactory = require('./core/factories/config-factory');

// Constant codes
const LITERALS = require('./core/literals/launcher-literals');
const EXIT_CODES = require('./core/literals/exit-codes-literals');
const WORKER_LITERALS = require('./core/literals/workers-literals');

class Launcher {
  constructor(workerName) {

    this.worker = {
      name: workerName,
      options: ConfigFactory.create(workerName),

      // Loads the worker
      ...require(WORKER_LITERALS.WORKER_PATH(workerName))
    };

    console.log(LITERALS.INITIALIZING_WORKER(this.worker.name));

    this.kernel = null;
    this.dbfactory = null;
  }

  configure() {
    try {
      console.log(LITERALS.CONFIGURING_WORKER(this.worker.name));

      // Defining unlimited listers
      process.setMaxListeners(0);

      // Define Worker global settings
      global.config = this.worker.options;

      // Getting pos analyzed engine settings
      return this.worker.configure(global.config);
    } catch(err) {
      console.log(err);
      process.exit(EXIT_CODES.UNEXPECTED_EXCEPTION);
    }
  }

  bootstrap(settings) {
    try {
      // Set server global settings
      console.log(LITERALS.BOOTSTRAPPING_WORKER(this.worker.name));
      console.log(LITERALS.SERVER_GLOBAL_SETTINGS);

      global.config = settings;

      // Kernel init
      this.kernel = new Kernel(global.config.kernel);
      this.kernel.start();

      // Database init
      this.dbfactory = new DBFactory(global.config.databases);
      this.dbfactory.configure();

    } catch(err) {
      console.log(err);
      process.exit(EXIT_CODES.UNEXPECTED_EXCEPTION);
    }
  }

  async run() {
    try  {
      const dbconnections = await this.dbfactory.createConnections(global.config.databases.connections);

      // DB Connections
      global.db = dbconnections;

      // Running worker
      console.log(LITERALS.INITIALIZING_WORKER(this.worker.name));
      await this.worker.start();

      // Shutdown events
      process
        .on('SIGINT', this.onShutdown)
        .on('SIGTERM', this.onShutdown);

    } catch(err) {
      console.error(`${LITERALS.ERROR_STARTING_SERVER}`, err);
      process.exit(EXIT_CODES.OPEN_DATABASE_CONNECTION_ERR);
    }
  }

  onShutdown() {
    global.console.info(LITERALS.KILL);
    global.console.info(LITERALS.SHUTTING_DOWN);

    this.exit();
  }
}

module.exports = Launcher;
