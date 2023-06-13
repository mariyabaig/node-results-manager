const jwt = require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require("bcrypt");
const Teacher = require("../models/teacherSchema");

const registerController = async (req, res) => {
  try {
    // Code for registration...

    res.render("teacher/login"); // Redirect to the login page
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginController = async (req, res) => {
  try {
    // Code for login...

    // Generate a JWT token
    const token = jwt.sign({ email: teacher.email, name: teacher.name }, process.env.SECRET_KEY);
    res.json({ token });
    // Redirect to the teacher's dashboard with the token as a query parameter
    res.redirect(`/teacher/dashboard?token=${token}`);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const dashboardController = async (req, res) => {
  try {
    console.log("Dashboard controller called");

    const token = req.query.token;

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Find the teacher by email in the database
    const teacher = await Teacher.findOne({ email: decoded.email });
    console.log("Retrieved teacher from the database:", teacher);
    res.json({ token });
    // You can pass the teacher's information to the dashboard view
    res.render("teacher/dashboard", { teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerController,
  loginController,
  dashboardController,
};
