const Marks = require("../models/marksSchema");

// Controller to render the add result form
const renderAddResultForm = (req, res) => {
  res.render("teacher/addresult");
};

const addResult = async (req, res) => {
  try {
    const { rollNumber, dob, name, totalScore } = req.body;

    // Check if a document with the same roll number already exists
    const existingMarks = await Marks.findOne({ rollNumber });
    if (existingMarks) {
      return res.status(400).json({ message: "Roll number already exists" });
    }

    // Create a new marks entry
    const marks = new Marks({ rollNumber, dob, name, totalScore });
    await marks.save();

    res.redirect("/teacher/dashboard"); // Redirect to the teacher's dashboard
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const viewResult = async (req, res) => {
  try {
    const rollNumber = req.params.rollNumber;

    // Find the marks entry by roll number
    const marks = await Marks.findOne({ rollNumber });
    if (!marks) {
      return res.status(404).json({ message: "Marks not found" });
    }

    res.json(marks); // Return the marks entry as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editResult = async (req, res) => {
  try {
    const rollNumber = req.params.rollNumber;
    const updates = req.body;

    // Find the marks entry by roll number and update it
    const marks = await Marks.findOneAndUpdate({ rollNumber }, updates, {
      new: true,
    });

    if (!marks) {
      return res.status(404).json({ message: "Marks not found" });
    }

    res.json(marks); // Return the updated marks entry as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteResult = async (req, res) => {
  try {
    const rollNumber = req.params.rollNumber;

    // Find the marks entry by roll number and delete it
    const marks = await Marks.findOneAndDelete({ rollNumber });

    if (!marks) {
      return res.status(404).json({ message: "Marks not found" });
    }

    res.json({ message: "Marks deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Controller to render the teacher's dashboard
const renderDashboard = async (req, res) => {
  try {
    // Fetch all the results
    const results = await Marks.find();

    res.render("teacher/dashboard", { results: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  renderAddResultForm,
   renderDashboard, 
  addResult,
  viewResult,
  editResult,
  deleteResult,
};
