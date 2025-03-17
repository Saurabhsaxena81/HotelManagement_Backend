const mongoose = require("mongoose");
require("dotenv").config();
//define the mongodb connection url

const mongoURL = process.env.mongoURL;
//setup mongodb connection
// mongoose.connect(mongoURL,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })

mongoose.connect(mongoURL);
//
// get the default connection
//mongoose aintains a default connection object representing the mongodb connection.

const db = mongoose.connection;

//dfine event listeners for database connection

db.on("connected", () => {
  console.log("Databse connected successfully");
});

db.on("error", () => {
  console.log("Error in connecting to database");
});
db.on("disconnected", () => {
  console.log("Database disconnected successfully");
});

module.exports = db;
