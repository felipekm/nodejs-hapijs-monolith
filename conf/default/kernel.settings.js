const os = require('os');
const MAX_WORKERS  = process.env.MAX_WORKERS || os.cpus().length;
const CLUSTER_WORKERS_REBIRTH = true;

// Fix tempdir() warning
os.tmpDir = os.tmpdir;

module.exports = {
  kernel: {
    log_tag: 'kernel',
    process: {
      title: 'SERVERPROCESS',
      rebirth: CLUSTER_WORKERS_REBIRTH,
      maxWorkers: MAX_WORKERS
    }
  }
};
