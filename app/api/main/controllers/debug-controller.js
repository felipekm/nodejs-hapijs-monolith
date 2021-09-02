// App dependenciess
const pkg = require('../../../../package.json');

exports.config = {
  auth: false,
  tags: [ 'main', 'debug' ],
  notes: 'Provides details about environment. Needs debug flag set as true in conf file.',
  description: 'Debug route'
};

/**
 * @function {handle} - Manage requests
 * @param  {object} request { The request object }
 * @param  {function} reply { The callback function }
 * @return {object} { Retorno da função invocada }
 */
exports.handle = ({ reply }) => {
  const data = {
    name: global.nodename,
    kernel: global.config.kernel.process,
    version: pkg.version,
    loaded_apis: global.apis,
    loaded_routes: global.routes,
    loaded_plugins: global.plugins
  };

  return reply(data);
};
