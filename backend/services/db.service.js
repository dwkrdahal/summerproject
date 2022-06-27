const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const { dbUrl, dbName } = require('../config/db.config');

const getSingleRow = (table, filter = {}) => {
    return new Promise((res, rej) => {
        MongoClient.connect(dbUrl, (err, client) => {
            if (err) {
                rej(err);
            } else {
                const db = client.db(dbName);
                if (!db) {
                    rej({ error: "DB Not Found" })
                } else {
                    db.collection(table).findOne(filter)
                        .then((result) => {
                            res(result);
                        })
                        .catch((error) => {
                            rej(error);
                        })
                }

            }
        })
    })

}

module.exports = getSingleRow;