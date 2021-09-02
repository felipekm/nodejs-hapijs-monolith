require('dotenv').config({
  path: '../.env'
});

const NodeEnvironment = require('jest-environment-node');
const ConfigFactory = require('../factories/config-factory');

module.exports = class CustomTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();

    const options = ConfigFactory.create(process.env.ENGINE);

    this.global.config = options;
  }

  async teardown() {
    delete this.global.config;

    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
};