require('dotenv').config();

module.exports = {
  databases: {
    env: 'development',
    connections: [
      {
        url: process.env.MONGODB_URL,
        name: 'mongodb',
        log_tag: 'mongodb'
      }
    ]
  }
};
