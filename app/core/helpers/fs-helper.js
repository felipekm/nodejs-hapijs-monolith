const fs = require('fs');
const walk = require('walk');
const Path = require('path');

exports.folderAssurance = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

exports.requireModules = (path, sufix) => {
  return new Promise((resolve, reject) => {
    try {

      const arrModules = [];
      const walker = walk.walk(path, { followLinks: false });

      walker.on('file', (root, stat, next) => {
        const filePath = Path.resolve(`${root}/${stat.name}`);
        let loadedModule;

        if (filePath.indexOf(sufix) === -1) {
          return next();
        }

        loadedModule = require(filePath);
        arrModules.push({loadedModule, filePath});

        return next();
      });

      walker.on('end', () => resolve(arrModules));

    } catch(err) {
      return reject(err);
    }
  });
};

module.exports = exports;