const bcrypt = require("bcrypt");
const Teacher = require("../models/teacherSchema");

const registerController = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if the email is already registered
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.render("teacher/register", { error: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = new Teacher({ email, password: hashedPassword, name });
    await teacher.save();

    res.render("teacher/login"); // Redirect to the login page
  } catch (error) {
    res.render("teacher/register", { error: "Server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.render("teacher/login", { error: "Invalid email or password" });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return res.render("teacher/login", { error: "Invalid email or password" });
    }

    // Set up session or authentication token for the logged-in teacher

    // Redirect to the teacher's dashboard upon successful login
    res.render("teacher/dashboard", { teacher });
  } catch (error) {
    res.render("teacher/login", { error: "Server error" });
  }
};

// Dashboard controller
const dashboardController = async (req, res) => {
  try {
    // Assuming you have a session-based authentication system in place,
    // you can access the authenticated teacher's information from the session
    const { email } = req.session.teacher;

    // Find the teacher by email in the database
    const teacher = await Teacher.findOne({ email });

    // You can pass the teacher's information to the dashboard view
    res.render("teacher/dashboard", { teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add marks controller
// const addMarksController = async (req, res) => {
//   try {
//     const { name, dob, totalScore, rollNumber } = req.body;
//     const marksData = new Marks({ name, dob, totalScore, rollNumber });
//     await marksData.save();
//     res.status(200).json({ message: "Marks added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

module.exports = {
  registerController,
  loginController,
  dashboardController, 
  // addMarksController
};
