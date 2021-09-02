const path = require('path');
const LITERALS = require('../literals/config-literals');

exports.targetEnv = process.env.NODE_ENV || 'development';

exports.create = (workerName) => {
  const rootPath = path.resolve('./');
  const confPath = `${rootPath}/${LITERALS.CONFIG_PATH}`;

  let settings;

  settings = Object.assign(

    // Engine Settings
    require(path.join(confPath, 'default', `${workerName}.settings`)),

    // Debug Settings
    require(path.join(confPath, 'default', 'debug.settings')),

    // Kernel Settings
    require(path.join(confPath, 'default', 'kernel.settings')),

    // Kernel Settings
    require(path.join(confPath, 'default', 'security.settings')),

    // Database Settings
    require(path.join(confPath, 'env', this.targetEnv, 'databases.settings')),

    // Base Settings
    require(path.join(confPath, 'env', this.targetEnv, 'base.settings')),

  );

  // Setting process name
  settings.kernel.process.title += `-${workerName}`;

  // Explicit settings
  settings.root = path.normalize(`${confPath}/../`);

  return settings;
};

module.exports = exports;
