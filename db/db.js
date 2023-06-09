const mongoose = require("mongoose");
const DB = process.env.DB

mongoose.connect(DB,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection
db.on('error',(error)=> console.log(error))
db.once("open",()=>console.log("Connected to the DB!"))