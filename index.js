require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const session = require("express-session");
const db = require("./db/db");
const studentRouter = require("./routes/studentRoutes");
const teacher = require("./routes/teacher");


const expressLayouts = require("express-ejs-layouts");

app.set('view engine', 'ejs');
app.set('layout', 'layout');

// Middleware for using express-ejs-layouts
app.use(expressLayouts);

// Set up routes
app.get("/", function (req, res) {
  res.render("app");
  
});

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/student", studentRouter);
app.use("/teacher", teacher);
// app.use("/allresults", teacherRoutes);

// Session configuration

app.use(
  session({
    secret: process.env.SESSION_SECRET || "aaSssAFAGAGAiIIPP",
    resave: false,
    saveUninitialized: true,
  })
);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use((req, res) => {
  res.status(404).render('404', { title: 'Page not found' });
});