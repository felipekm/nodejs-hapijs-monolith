const url = require('url');
const LITERALS = require('../literals/dbfactory-literals');

class DBFactory {

  constructor() {
    this.handlers = {
      mongodb: require('./handlers/mongo-handler')
    };
  }

  configure() {
    console.log(LITERALS.INITIALIZING_DBFACTORY);
  }

  createConnections(dblist) {
    return new Promise(async(resolve, reject) => {
      try {

        const dbConnections = {};
        let i;

        for (i = 0; i < dblist.length; i++) {

          let dbclient = {};
          const metadata = dblist[i];
          const DbHandler = this.getHandler(metadata.url);

          console.log(`${LITERALS.INITIALIZING_DATABASE}: ${metadata.name}`);
          console.log(`${LITERALS.DATABASE_URL}: ${metadata.url}`);

          dbclient[metadata.name] = new DbHandler(metadata, console.log);
          await dbclient[metadata.name].open();

          // Pushing to provide it globally
          dbConnections[`${metadata.name}`] = dbclient[`${metadata.name}`];

          console.log(`${LITERALS.DATABASE_SUCCESSFULLY_CONNECTED}: ${metadata.name}`);
        }

        return resolve(dbConnections);

      } catch (err) {
        console.log(LITERALS.ERROR_CONNECTING_DATABASE);
        console.error(LITERALS.ERROR_DETAILS(err));
        return reject(err);
      }
    });
  }

  closeAll() {
    try {
      for (const connection in global.db) {

        if (!global.db.hasOwnProperty(connection)) {
          console.log(LITERALS.PROPERTY_NOT_FOUND(connection));
          throw new Error(LITERALS.PROPERTY_NOT_FOUND(connection));
        }

        console.log(LITERALS.CLOSING_DB_CONNECTIONS(connection));
        global.db[connection].close();
        console.log(LITERALS.DATABASE_CONNECTION_CLOSED);
      }
    } catch(err) {
      console.log(LITERALS.ERROR_CLOSING_DATABASE);
      throw err;
    }
  }

  getHandler(dburl) {
    const parsed = url.parse(dburl);
    const protocol = parsed.protocol.replace(':', '');

    return this.handlers[protocol];
  }

}

module.exports = DBFactory;
