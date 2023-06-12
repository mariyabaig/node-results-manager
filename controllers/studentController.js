const Student = require("../models/studentSchema");

// Controller for student login
const login = async (req, res) => {
  try {
    const { roll, dob } = req.body;

    // Check if the student exists
    const student = await Student.findOne({ roll, dob });
    if (!student) {
      return res.render("login", { error: "Invalid roll number or date of birth" });
    }

    // Render the student result page with the student data
    res.render("result", { student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  login,
};
