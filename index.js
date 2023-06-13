require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const session = require("express-session");
const db = require("./db/db");
const studentRouter = require("./routes/studentRoutes");
const teacherAuth = require("./routes/teacherAuth");
const teacherRoutes = require("./routes/teacherRoutes");

//app.set('views', __dirname + '/layout');
app.set('view engine', 'ejs');

// Set up routes
app.get("/", function (req, res) {
  res.render("app");
});


app.set('layout', 'layout');


//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/student", studentRouter);
app.use("/teacher", teacherAuth);

// Set up routes
app.use("/teacheract", teacherRoutes);

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
