const mongoose = require("mongoose");
require("dotenv").config();

var MONGODB_USERNAME = process.env.MONGODB_USERNAME;
var MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// --------------------- BDD -----------------------------------------------------
mongoose.connect(
  "mongodb+srv://" +
    MONGODB_USERNAME +
    ":" +
    MONGODB_PASSWORD +
    "@cluster0.7ftbf.mongodb.net/db_ticetac?retryWrites=true&w=majority",
  options,
  function (err) {
    if (err) {
      console.log(
        `error, failed to connect to the database because --> ${err}`
      );
    } else {
      console.info("*** Database Ticketac connection : Success ***");
    }
  }
);
module.exports = mongoose;
