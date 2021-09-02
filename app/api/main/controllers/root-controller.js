const pkg = require('../../../../package.json');

exports.config = {
  auth: false,
  tags: [ 'main', 'ping' ],
  notes: 'Ping route to check if server is up or not.',
  description: 'Ping route!'
};

/**
 * @function {handle} - Função de Ping que retorna informações do web sever
 * @param  {object} request { The request object }
 * @param  {function} reply { The callback function }
 * @return {object} { Retorno da função invocada }
 */
exports.handle = () => {
  const welcomeData = {
    name: pkg.description,
    version: pkg.version,
    environment: process.env.NODE_ENV
  };

  return welcomeData;
};
