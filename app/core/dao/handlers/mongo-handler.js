const mongo = require('mongodb');
const ObjectID = mongo.ObjectID;
const mongoClient = mongo.MongoClient;
const formatHelper = require('../../helpers/format-helper');

const SUCCESS_DEFAULT_RESPONSE = {
  success: true
};

class MongoHandler {

  constructor(settings) {
    this.db = null;
    this.url = settings.url;
  }

  open() {
    return new Promise((resolve, reject) => {
      try {
        mongoClient.connect(this.url, (err, dbconn) => {
          if (err) {
            return reject(err);
          }

          this.db = dbconn;

          return resolve();
        });
      } catch(err) {
        return reject(err);
      }
    });
  }

  close() {
    this.db.close();
  }

  insert(collectionName, doc) {
    return new Promise((resolve, reject) => {
      this.db.collection(collectionName, (err, collection) => {
        if (err) {
          return reject(err);
        }
        collection.insert(doc, { w: 1 }, (err, data) => {
          if (err || !data.result.ok === 1) {
            return reject(err || data);
          }

          return resolve(SUCCESS_DEFAULT_RESPONSE);
        });
      });
    });
  }

  delete(collectionName, id, obj) {
    return new Promise((resolve, reject) => {
      try {
        this.db.collection(collectionName, (err, collection) => {
          if (err) return reject(err);
          collection.update({ _id: new ObjectID(id)}, { $set: obj }, (err, data) => {
            if (err || !data.result.ok === 1) {
              return reject(err);
            }

            return resolve(SUCCESS_DEFAULT_RESPONSE);
          });
        });
      } catch(err) {
        return reject(err);
      }
    });
  }

  count(collectionName) {
    return new Promise((resolve, reject) => {
      try {
        this.db.collection(collectionName, (err, collection) => {
          if (err) return reject(err);
          collection.count(null, (err, data) => {
            if (err || !data.result.ok === 1) {
              return reject(err || data);
            }

            SUCCESS_DEFAULT_RESPONSE.data = data;

            return resolve(SUCCESS_DEFAULT_RESPONSE);
          });
        });
      } catch(err) {
        return reject(err);
      }
    });
  }

  update(collectionName, doc) {
    return new Promise((resolve, reject) => {
      try {

        let i;
        let idOne;
        let arraySplitDocId = [];

        const arrayIds = [];

        if (Array.isArray(doc._id)) {
          arraySplitDocId = doc._id.split(',');

          for (i = 0; i < arraySplitDocId.length; i += 1)
            if (formatHelper.isOID(arraySplitDocId[i]))
              arrayIds.push(new ObjectID(arraySplitDocId[i]));

        } else if (formatHelper.isOID(doc._id)) {
          idOne = new ObjectID(doc._id);
          delete doc._id;
        }

        this.db.collection(collectionName, function(err, collection) {
          if (err)
            return reject(err);

          // Array data update
          if (arrayIds && Array.isArray(arrayIds) && arrayIds.length > 0) {
            collection.update({'_id': { '$in': arrayIds }}, { '$set' : doc.$set }, { 'multi': true }, (err, data) => {
              if (err) return reject(err);
              return resolve(null, data);
            });
          }

          // Single data update
          if (idOne) {
            collection.update({'_id': idOne}, doc, (err, data) => {
              if (err) return reject(err);
              return resolve(null, data);
            });
          }

          return resolve();
        });
      } catch(err) {
        console.error(err);
        return reject(err);
      }
    });
  }

  updateByQuery(collectionName, query, upsert = false) {
    return new Promise((resolve, reject) => {
      try {
        this.db.collection(collectionName, (err, collection) => {
          if (err) {
            return reject(err);
          }

          collection.update(query.clause, query.update, { multi: true, upsert: upsert }, (err, data) => {
            if (err || !data.result.ok === 1) {
              return reject(err || data);
            }

            SUCCESS_DEFAULT_RESPONSE.success = data.result.ok === 1;

            return resolve(SUCCESS_DEFAULT_RESPONSE);
          });
        });
      } catch(err) {
        console.error(err);
        return reject(err);
      }
    });
  }

  find(collectionName, query, sort, limit, skip, projection) {
    return new Promise((resolve, reject) => {
      try {

        const defaultCallback = (err, data) => {
          if (err) {
            return reject(err);
          }

          SUCCESS_DEFAULT_RESPONSE.data = data;

          return resolve(SUCCESS_DEFAULT_RESPONSE);
        };

        this.db.collection(collectionName, (err, collection) => {
          if (err) {
            return reject(err);
          }

          if (projection && sort && limit) {
            return collection.find(query, projection).sort(sort).skip(skip).limit(limit).toArray(defaultCallback);
          } else if (projection && sort && !limit) {
            return collection.find(query, projection).sort(sort).toArray(defaultCallback);
          } else if (projection && !sort && !limit) {
            return collection.find(query, projection).toArray(defaultCallback);
          } else if (sort && !projection && !limit) {
            return collection.find(query).sort(sort).toArray(defaultCallback);
          } else {
            return collection.find(query).toArray(defaultCallback);
          }
        });
      } catch(err) {
        console.error(err);
        return reject(err);
      }
    });
  }
}

module.exports = MongoHandler;
