
const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.DB;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to the DB!"));

module.exports = db;
