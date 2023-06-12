const Marks = require("../models/marksSchema");

// Controller to render the add result form
const renderAddResultForm = (req, res) => {
  res.render("addresult");
};

// Controller to handle the form submission and add a new result
const addResult = async (req, res) => {
  try {
    const { rollNumber, dob, name, totalScore } = req.body;

    // Create a new marks entry
    const marks = new Marks({ rollNumber, dob, name, totalScore });
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
