const Marks = require("../models/marksSchema");

// Controller to render the add result form
const renderAddResultForm = (req, res) => {
  res.render("addresult");
};

// const addResult = async (req, res) => {
//     try {
//       const { rollNumber, dob, name, totalScore } = req.body;
  
//       // Check if a document with the same roll number already exists
//       const existingMarks = await Marks.findOne({ rollNumber });
//       if (existingMarks) {
//         return res.status(400).json({ message: "Roll number already exists" });
//       }
  
//       // Create a new marks entry
//       const marks = new Marks({ rollNumber, dob, name, totalScore });
//       await marks.save();
  
//       res.redirect("/teacher/dashboard"); // Redirect to the teacher's dashboard
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error" });
//     }
//   };
  
const addResult = async (req, res) => {
  try {
    const { rollNumber, dob, name, totalScore } = req.body;

    // Find the student by roll number
    const student = await Student.findOne({ roll: rollNumber });

    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    // Create a new marks entry and associate it with the student
    const marks = new Marks({
      rollNumber,
      dob,
      name,
      totalScore,
      student: student._id, // Assign the student's ObjectId to the marks entry
    });

    await marks.save();

    res.redirect("/teacher/dashboard"); // Redirect to the teacher's dashboard
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  renderAddResultForm,
  addResult,
};
