// Student login controller
const Marks = require("../models/marksSchema");
const Student = require("../models/studentSchema");

const login = async (req, res) => {
  try {
    const { roll, dob } = req.body;

    // Check if the roll number exists in the marks schema
    const marks = await Marks.findOne({ rollNumber: roll });
    console.log("marks:", marks);

    if (!marks) {
      console.log("Invalid credentials: marks not found");
      return res.status(400).send("Invalid credentials");
    }

    // Check if the date of birth in marks schema matches the provided date of birth
    const marksDob = marks.dob.toISOString().slice(0, 10); // Convert marks.dob to string format "yyyy-mm-dd"
    console.log(marks.dob.toISOString().slice(0, 10))
   console.log("dob",dob )
    if (marksDob === dob) {
      console.log("dob is matched for rollnumber");
      const rollNumberDetails = {
        roll: marks.rollNumber,
        name: marks.name,
        totalScore: marks.totalScore,
        dob : marks.dob
      };
      res.render("student/result", {rollNumberDetails})
      console.log(rollNumberDetails)
    //   const marks = await Marks.findOne({rollNumber : roll});
    // console.log("student:", marks);
      // return res.status(400).send("Invalid credentials");
    }

    // Find the student entry based on the roll number
    // const student = await Student.findOne({ roll });
    // console.log("student:", student);

    // if (!student) {
    //   console.log("Invalid credentials: student not found");
    //   return res.status(400).send("Invalid credentials");
    // }

    // Get the details of the logged-in roll number
    const rollNumberDetails = {
      roll: marks.rollNumber,
      name: marks.name,
      totalScore: marks.totalScore,
      dob : marks.dob
    };
    
    console.log("rollNumberDetails:", rollNumberDetails);

    // Render the "result" template and pass the roll number details as data
    res.render("student/result", { rollNumberDetails: rollNumberDetails });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  login,
};
