const mongoose = require("mongoose");
require("dotenv").config();
//define the mongodb connection url
//const mongoURL = "mongodb://localhost:27017/crudHelloWorld"
// const mongoURL = "mongodb+srv://saurabhsaxena81272:hotel123@cluster0.xn3l7.mongodb.net/"
const mongoURL = process.env.mongoURL || process.env.localDB;
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
