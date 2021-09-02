const fsHelper = require('./fs-helper');

/**
 * @function requireModules
 * @param  {type} modulesPath The plugins path
 * @param  {type} modulesSufix The file sufix name eg: `-plugin`, `-routes`
 * @return {type} An array of
 */
module.exports.requireModules = (modulesPath, modulesSufix) => {
  return new Promise(async(resolve, reject) => {
    try {
      let arrModules = [];

      arrModules = await fsHelper.requireModules(modulesPath, modulesSufix);
      return resolve(arrModules);
    } catch(err) {
      return reject(err);
    }
  });
};