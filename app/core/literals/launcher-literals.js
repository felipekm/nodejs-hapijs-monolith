module.exports = {
  INDEX_PATH: './app/launcher',
  INDEX_FILE_NAME: 'server.js',

  INITIALIZING_LOG: 'Initializing log',
  INITIALIZING_SERVER: 'Initializing server',

  CONFIGURING_WORKER: (workerName) => `Configuring ${workerName}`,
  INITIALIZING_WORKER: (workerName) => `Initializing ${workerName}`,
  BOOTSTRAPPING_WORKER: (workerName) => `Bootstraping ${workerName}`,

  SERVER_GLOBAL_SETTINGS: 'Exposing server global settings in global.config',

  ERROR_WORKER_UNDEFINED: 'Could not find the worker name!',
  ERROR_INITIALIING_DB_FACTORY: 'Could not initialize DB Factory!',
  ERROR_STARTING_SERVER: 'Could not start the worker.',

  SHUTTING_DOWN: 'Shutting down Server..',
  FORCING_SHUTTING_DOWN: 'Forcing to shutdown Server..',
  KILL: 'Kill command received (SIGINT | SIGTERM)',
  PROCESS_HAS_BEEN_FINISHED: 'The process has been finished'
};