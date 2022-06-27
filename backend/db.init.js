const mongoose = require("mongoose");
const { dbName, dbUrl } = require("./config/db.config");

const conUrl = dbUrl + "/" + dbName;

mongoose.connect(conUrl, {
    autoIndex: true
}, (err, done) => {
    if (err) {
        console.log("Error in database connection");
        console.log(err);
    } else {
        console.log("Mongoose connected successfully");
    }
});