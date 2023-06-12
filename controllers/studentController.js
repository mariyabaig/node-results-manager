const Student = require("../models/studentSchema");
const Marks = require("../models/marksSchema");

// Student login controller
const login = async (req, res) => {
  try {
    const { roll, dob } = req.body;

    // Check if the student exists
    const student = await Student.findOne({ roll });
    if (!student) {
      return res.status(400).send("Invalid credentials");
    }

    // Find the marks entry for the student
    const marks = await Marks.findOne({ rollNumber: roll });
    if (!marks || marks.dob !== dob) {
      return res.status(400).send("Invalid credentials");
    }

    // Render the results page with the student and marks data
    res.render("results", { student, marks });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  login,
};
