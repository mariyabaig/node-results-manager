const Student = require("../models/studentSchema");
const Marks = require("../models/marksSchema");

// Student login controller
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
res.redirect("/result")
    // Send the student and marks data as the response
    res.status(200).json({ student, marks });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  login,
};
