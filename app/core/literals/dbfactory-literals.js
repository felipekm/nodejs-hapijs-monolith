module.exports = {
  DATABASE_URL: 'Database URL',
  DB_FACTORY_IS_DONE: 'All databases successfuly initialized',
  INITIALIZING_DATABASE: 'Initializing database connection',
  INITIALIZING_DBFACTORY: 'Initializing DBFactory',
  DATABASE_CONNECTION_CLOSED: 'The database connection has been closed',
  DATABASE_SUCCESSFULLY_CONNECTED: 'Database successfully connected',

  CLOSING_DB_CONNECTIONS: (connection) => `Closing database connection: ${connection}`,
  ERROR_PROPERTY_NOT_FOUND: (connection) => `Property connection: ${connection} not found`,

  ERROR_CLOSING_DATABASE: 'Error closing database',
  ERROR_CONNECTING_DATABASE: 'Error connecting database',
  ERROR_DETAILS: (err) => `Error details: ${err}`
};