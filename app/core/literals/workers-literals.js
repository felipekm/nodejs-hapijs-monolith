module.exports = {
  DEFAULT_WORKER: 'webapi',
  WORKER_PATH: (workerName) => `./core/workers/${workerName}/${workerName}-index`
};