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
    console.log("Email:", req.body.email);
    console.log("Password:", req.body.password);

    const teacher = await Teacher.findOne({ email: req.body.email });
    console.log(teacher);
    if (!teacher) {
      return res.render("teacher/login", { error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, teacher.password);
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res.render("teacher/login", { error: "Invalid email or password" });
    }
    console.log("Password is valid!");
    res.redirect("/teacher/dashboard");
  } catch (error) {
    console.error(error);
    res.render("teacher/login", { error: "An error occurred during login" });
  }
};

// const loginController = async (req, res) => {
//   try {
//     //const { email, password } = req.body;
//     console.log("Email:", req.body.email);
//     console.log("Password:", req.body.password);

//     // Check if the email exists
//     const teacher = await Teacher.findOne({ email: req.body.email });
//     console.log(teacher); // Log the teacher object
//     if (!teacher) {
//       return res.render("teacher/login", { error: "Invalid email or password" });
//     }

//     // Compare the entered password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(req.body.password, req.body.teacher.password);
//     if (!isPasswordValid) {
//       return res.render("teacher/login", { error: "Invalid email or password" });
//     }

//     // Set up session or authentication token for the logged-in teacher
//     req.session.teacher = teacher;
//     // Redirect to the teacher's dashboard upon successful login
//     res.redirect("/teacher/dashboard");
//   } catch (error) {
//     console.error(error);
//     res.render("teacher/login", { error: "An error occurred during login" });
//   }
// };


// const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("Email:", email);
//     console.log("Password:", password);

//     // Check if the email exists
//     const teacher = await Teacher.findOne({ email });
//     if (!teacher) {
//       return res.render("teacher/login", { error: "Invalid email or password" });
//     }

//     // Compare the entered password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, teacher.password);
//     if (!isPasswordValid) {
//       return res.render("teacher/login", { error: "Invalid email or password" });
//     }

//     // Set up session or authentication token for the logged-in teacher

//     // Redirect to the teacher's dashboard upon successful login
//     res.redirect("/teacher/dashboard", { teacher });
//   } catch (error) {
//     console.error(error);
//     res.render("teacher/login", { error: "An error occurred during login" });
//   }
// };



// const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the email exists
//     const teacher = await Teacher.findOne({ email });
//     if (!teacher) {
//       return res.render("teacher/login", { error: "Invalid email or password" });
//     }

//     // Compare the entered password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, teacher.password);
//     if (!isPasswordValid) {
//       return res.render("teacher/login", { error: "Invalid email or password" });
//     }

//     res.redirect("/teacher/dashboard", { teacher });
//   } catch (error) {
//     res.render("teacher/login", { error: "Server error" });
//   }
// };

// Dashboard controller
// const dashboardController = async (req, res) => {
//   try {
   
//     const { email } = req.session.teacher;
//     const teacher = await Teacher.findOne({ email });
//     res.render("teacher/dashboard", { teacher });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const dashboardController = async (req, res) => {
//   try {
//     const { email } = req.session.teacher || {};
//     const teacher = await Teacher.findOne({ email: req.body.email });
//     res.render("teacher/dashboard", { teacher });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



module.exports = {
  registerController,
  loginController,
  // dashboardController, 
  // addMarksController
};
