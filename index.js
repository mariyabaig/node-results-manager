require("dotenv").config();
const express = require("express")
const app = express()
const port = process.env.PORT || 4000
const mongoose= require("mongoose")
const session = require("express-session")

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const DB = process.env.DB

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});
;

const db = mongoose.connection
db.on('error',(error)=> console.log(error))
db.once("open",()=>console.log("Connected to the DB!"))