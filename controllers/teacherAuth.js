const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/TeacherSchema");
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const router = express.Router();

const registerController = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if the email already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.render("teacher/register", { error: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new teacher
    const teacher = new Teacher({ email, password: hashedPassword, name });
    await teacher.save();

    res.render("teacher/register", { message: "Teacher registered successfully" });
  } catch (error) {
    res.render("teacher/register", { error: "Server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the teacher exists
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.render("teacher/login", { error: "Invalid email or password" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return res.render("teacher/login", { error: "Invalid email or password" });
    }

    // Create and sign the JWT token
    const token = jwt.sign({ email: teacher.email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.redirect("/teacher/dashboard"); // Redirect to the teacher's dashboard page
  } catch (error) {
    res.render("teacher/login", { error: "Server error" });
  }
};

const dashboardController = (req, res) => {
  // Handle rendering teacher's dashboard logic
  res.render("teacher/dashboard");
};

module.exports = {
  registerController,
  loginController,
  dashboardController,
};
