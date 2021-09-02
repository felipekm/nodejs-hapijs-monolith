const LITERALS = require('./literals/kernel-literals');
const EXIT_CODE_LITERALS = require('./literals/exit-codes-literals');

class Kernel {

  constructor(settings) {
    this.settings = settings;
  }

  onCrash(err) {
    console.error(err.message, err.stack);
    process.exit(EXIT_CODE_LITERALS.UNEXPECTED_EXCEPTION);
  }

  start() {

    console.log(LITERALS.INITIALIZING_KERNEL);

    // Rebirth settings
    console.log(this.settings.process.rebirth
      ? LITERALS.IS_REBIRTH_ACTIVE
      : LITERALS.IS_REBIRTH_INACTIVE);

    // Process title
    process.title = this.settings.process.title;

    // Error handling events
    process.on('error', this.onCrash);
    process.on('uncaughtException', this.onCrash);
  }

}

module.exports = Kernel;