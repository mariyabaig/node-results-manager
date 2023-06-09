require("dotenv").config();
const express = require("express")
const app = express()
const port = process.env.PORT || 4000
const mongoose= require("mongoose")
const session = require("express-session")
const db = require("./db/db");

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
