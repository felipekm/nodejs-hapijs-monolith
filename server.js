const WORKER_LITERALS = require('./app/core/literals/workers-literals');
const LAUNCHER_LITERALS = require('./app/core/literals/launcher-literals');
const Launcher = require(LAUNCHER_LITERALS.INDEX_PATH);

class CoreServer {

  static init() {

    // Initializes Dotenv
    require('dotenv').config();

    // Worker creation -- default is webapi
    const workerName = process.env.ENGINE || WORKER_LITERALS.DEFAULT_WORKER;
    const launcher = new Launcher(workerName);

    console.log(LAUNCHER_LITERALS.INITIALIZING_SERVER);

    // Configures worker
    const launcherConfig = launcher.configure();

    // Defines configuration
    launcher.bootstrap(launcherConfig);

    // Starts worker
    launcher.run();
  }
}

CoreServer.init();
