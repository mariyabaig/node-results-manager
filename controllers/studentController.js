const Marks = require("../models/marksSchema");
const Student = require("../models/studentSchema");

const login = async (req, res) => {
  try {
    const { roll, dob } = req.body;
    console.log("Received login request:", { roll, dob });

    // Check if the roll number exists in the marks schema
    const marks = await Marks.findOne({ rollNumber: roll });
    console.log("marks:", marks);

    if (!marks) {
      console.log("Invalid credentials: marks not found");
      return res.status(400).send("Invalid credentials");
    }

    // Check if the date of birth in marks schema matches the provided date of birth
    const marksDob = marks.dob.toISOString().slice(0, 10); // Convert marks.dob to string format "yyyy-mm-dd"
    console.log("marksDob:", marksDob);
    console.log("dob:", dob);

    if (marksDob !== dob) {
      console.log("Invalid credentials: dob does not match");
      return res.status(400).send("Invalid credentials");
    }

    // Find the student entry based on the roll number
    const result = await Marks.findOne({ rollNumber : roll });
    console.log("student:", result);

    if (!result) {
      console.log("Invalid credentials: student not found");
      return res.status(400).send("Invalid credentials");
    }

    // Get the details of the logged-in roll number
    const rollNumberDetails = {
      roll: marks.rollNumber,
      name: marks.name,
      totalScore: marks.totalScore,
      dob: marks.dob,
    };

    console.log("rollNumberDetails:", rollNumberDetails);

    // Render the "result" template and pass the roll number details as data
    res.render("student/result", { rollNumberDetails });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  login,
};
