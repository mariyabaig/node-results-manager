// Assuming the necessary modules and models are imported

// Student login controller
const Marks = require("../models/marksSchema");
const Student= require ("../models/studentSchema")
const login = async (req, res) => {
  try {
    const { roll, dob } = req.body;

    // Check if the roll number exists in the marks schema
    const marks = await Marks.findOne({ rollNumber: roll });
    if (!marks) {
      return res.status(400).send("Invalid credentials");
    }

    // Check if the date of birth in marks schema matches the provided date of birth
    if (!marks.dob || marks.dob.toString() !== dob) {
      return res.status(400).send("Invalid credentials");
    }

    // Find the student entry based on the roll number
    const student = await Student.findOne({ roll });
    if (!student) {
      return res.status(400).send("Invalid credentials");
    }

    // Get the details of the logged-in roll number
    const rollNumberDetails = {
      roll: student.roll,
      name: student.name,
      totalScore: marks.totalScore
    };

    // Render the "result" template and pass the roll number details as data
    res.render("teacher/result", { rollNumberDetails });
    console.log(rollNumberDetails)
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  login,
};
