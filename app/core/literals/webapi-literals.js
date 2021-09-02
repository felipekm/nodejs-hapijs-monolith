module.exports = {
  INITIALIZING_API_ROUTES: 'Initializing API routes',
  CONFIGURING_API: 'Configuring Router API',
  API_HAS_BEEN_REGISTERED: 'API has been registered',
  INITIALIZING_PLUGINS: 'Initializing plugins',
  INITIALIZING_HTTP_SERVER: 'Initializing HapiJS Server',
  STARTING_HTTP_SERVER: 'Starting HapiJS Server',
  PLUGINS_HAS_BEEN_REGISTERED: 'Plugins has been registered',
  SHUTTING_DOWN: 'Shutting down Core API Server',
  CURRENTLY_NODE_ENV: (nodeEnv) => `NODE_ENV: ${nodeEnv}`,
  CURRENTLY_SERVER_URL: (serverURI) => `SERVER_URI: ${serverURI}`,

  INITIALIZING_API: (apiName) => `Initializing API: ${apiName}`,
  API_FOLDER_PATH: (fullPath) => `API fullpath: ${fullPath}`,
  PLUGINS_FOLDER_PATH: (fullPath) => `Plugin fullpath: ${fullPath}`,

  NO_PLUGINS_FOUND: 'No plugins found to register',

  ERROR_STARTING_SERVER: 'Error starting HapiJS Server',
  ERROR_LOADING_API: (apiName) => `Error loading API: ${apiName}`,
  ERROR_LOADING_PLUGIN: 'Error loading plugin',
  ERROR_CONFIGURING_API: 'Error configuring API',
  ERROR_STARTING_API: 'Error starting API',
  ERROR_UNEXPECTED: 'Unexpected error when shutting down Core API Server',
  ERROR_SERVER_UNDEFINED: 'The server is undefined',
  ERROR_DETAILS: (err) => `Error details: ${err}`,
  ERROR_REGISTERING_PLUGIN: (pluginName) => `Error registering plugin: ${pluginName}`,
  ERROR_REGISTERING_ROUTE: (routePath) => `Error registering route: ${routePath}`
};