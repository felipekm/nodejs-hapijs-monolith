const WEB_SERVER_PORT = process.env.PORT || 5000;

module.exports = {
  webapi: {

    // ./app/api
    paths: [
      'main',
      'v1'
    ],

    sufix: 'routes.js',

    server: {
      debug: {
        request: ['error']
      }
    },

    // RFC default is 80 or 443 (ssl)
    connection: {
      port: WEB_SERVER_PORT,
      host: '0.0.0.0',
      routes: {
        cors: true
      }
    },

    plugins: {
      folder: 'app/plugins',
      sufix: '-plugin.js'
    }
  }
};
