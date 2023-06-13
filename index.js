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
const path = require("path");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Set the view engine
app.set("view engine", "ejs");

// Set up static file serving
app.use(express.static(path.join(__dirname, "public")));

// Set up routes
app.get("/", function (req, res) {
  res.render("app");
});

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/student", studentRouter);
app.use("/teacher", teacherAuth);

// Set up routes
app.use("/teacher", teacherRoutes);

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
